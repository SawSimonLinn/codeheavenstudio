'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Receipt, CreateReceiptData } from '@/types/receipt';

type PresetService = {
  name: string;
  price: number;
  description: string;
  recurring?: boolean;
};

type DueDatePreset = 'custom' | '1w' | '2w' | '1m';

const DEFAULT_PAYMENT_NOTES = [
  'Payment Instructions:',
  '- Please include the receipt number in your payment note or memo.',
  '- Accepted payment methods: Cash, Check, Zelle, Bank Transfer.',
].join('\n');

function toDateInputValue(date: Date): string {
  return date.toISOString().split('T')[0];
}

function addDueDateByPreset(issueDate: string, preset: Exclude<DueDatePreset, 'custom'>): string {
  const base = new Date(issueDate);
  if (Number.isNaN(base.getTime())) return '';

  const next = new Date(base);
  if (preset === '1w') {
    next.setDate(next.getDate() + 7);
  } else if (preset === '2w') {
    next.setDate(next.getDate() + 14);
  } else {
    next.setMonth(next.getMonth() + 1);
  }

  return toDateInputValue(next);
}

const planOptions: PresetService[] = [
  {
    name: 'Starter Package',
    price: 938,
    description: 'Starter web package (discounted plan rate).',
  },
  {
    name: 'Growth Package',
    price: 1725,
    description: 'Growth web package (discounted plan rate).',
  },
  {
    name: 'Premium Package',
    price: 3375,
    description: 'Premium web package (discounted plan rate).',
  },
];

const addOnOptions: PresetService[] = [
  { name: 'Custom Logo & Branding', price: 450, description: 'Professional logo design, brand colors, and typography guidelines.' },
  { name: 'Extra Pages', price: 150, description: 'Add more pages to your website as your business grows.' },
  { name: 'Full SEO Setup', price: 500, description: 'Comprehensive on-page and technical SEO to boost your ranking.' },
  { name: 'Blog Integration', price: 300, description: 'A fully functional blog to share updates and attract traffic.' },
  { name: 'Multi-language Support', price: 350, description: 'Translate and localize your site for global audiences.' },
  { name: 'Speed & Performance Boost', price: 250, description: 'Advanced optimization for ultra-fast load times.' },
  { name: 'SEO Copywriting', price: 300, description: 'SEO-friendly website content for better engagement and ranking.' },
  { name: 'Ongoing SEO & Marketing', price: 400, description: 'Continuous optimization, keyword tracking, and marketing strategy.', recurring: true },
  { name: 'Website Maintenance & Support', price: 200, description: 'Updates, backups, bug fixes, and priority support.', recurring: true },
  { name: 'Custom Video / Animation', price: 500, description: 'A tailored explainer video or homepage animation for your brand.' },
  { name: 'AI Features (chatbot, automation)', price: 500, description: 'Integrate a custom AI chatbot or workflow automation tools.' },
];

const itemSchema = z.object({
  id: z.string(),
  serviceName: z.string().min(1, 'Required'),
  description: z.string().default(''),
  quantity: z.coerce.number().min(1, 'Min 1'),
  price: z.coerce.number().min(0, 'Min 0'),
});

const schema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Valid email required'),
  companyName: z.string().default(''),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().default(''),
  items: z.array(itemSchema).min(1, 'Add at least one service'),
  tax: z.coerce.number().min(0).max(100).default(0),
  discount: z.coerce.number().min(0).default(0),
  notes: z.string().default(''),
  status: z.enum(['draft', 'sent', 'paid']).default('draft'),
});

export type ReceiptFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<Receipt>;
  onSubmit: (data: CreateReceiptData) => Promise<void>;
  onChange?: (data: ReceiptFormValues) => void;
  submitLabel?: string;
  loading?: boolean;
}

function asNumber(value: unknown): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function newItem(): ReceiptFormValues['items'][0] {
  return { id: crypto.randomUUID(), serviceName: '', description: '', quantity: 1, price: 0 };
}

function buildPresetId(type: 'plan' | 'addon', name: string): string {
  return `preset-${type}:${name}`;
}

export default function ReceiptForm({
  defaultValues,
  onSubmit,
  onChange,
  submitLabel = 'Save Receipt',
  loading = false,
}: Props) {
  const today = new Date().toISOString().split('T')[0];
  const [dueDatePreset, setDueDatePreset] = useState<DueDatePreset>('custom');

  const form = useForm<ReceiptFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      clientName: defaultValues?.clientName ?? '',
      clientEmail: defaultValues?.clientEmail ?? '',
      companyName: defaultValues?.companyName ?? '',
      issueDate: defaultValues?.issueDate ?? today,
      dueDate: defaultValues?.dueDate ?? '',
      items: defaultValues?.items ?? [newItem()],
      tax: defaultValues?.tax ?? 0,
      discount: defaultValues?.discount ?? 0,
      notes: defaultValues?.notes ?? DEFAULT_PAYMENT_NOTES,
      status: defaultValues?.status ?? 'draft',
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'items' });
  const watched = useWatch({ control: form.control });
  const dueDateField = form.register('dueDate');

  useEffect(() => {
    if (dueDatePreset === 'custom') return;

    const issueDate = watched.issueDate || today;
    const nextDueDate = addDueDateByPreset(issueDate, dueDatePreset);
    if (!nextDueDate) return;

    if (watched.dueDate !== nextDueDate) {
      form.setValue('dueDate', nextDueDate, { shouldDirty: true });
    }
  }, [dueDatePreset, watched.issueDate]);

  useEffect(() => {
    if (onChange) onChange(watched as ReceiptFormValues);
  }, [JSON.stringify(watched)]);

  const items = watched.items ?? [];
  const selectedPlanName =
    items.find((item) => item?.id?.startsWith('preset-plan:'))?.serviceName ?? '';
  const subtotal = items.reduce((s, i) => s + asNumber(i?.quantity) * asNumber(i?.price), 0);
  const tax = asNumber(watched.tax);
  const discount = asNumber(watched.discount);
  const taxAmt = (subtotal * tax) / 100;
  const total = subtotal + taxAmt - discount;

  const removeItemsByIndexes = (indexes: number[]) => {
    [...indexes].sort((a, b) => b - a).forEach((index) => remove(index));
  };

  const handleSelectPlan = (planName: string) => {
    const existingItems = form.getValues('items') ?? [];
    const planIndexes = existingItems
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.id.startsWith('preset-plan:'))
      .map(({ index }) => index);

    removeItemsByIndexes(planIndexes);

    if (planName === 'none') {
      return;
    }

    const selectedPlan = planOptions.find((option) => option.name === planName);
    if (!selectedPlan) {
      return;
    }

    append({
      id: buildPresetId('plan', selectedPlan.name),
      serviceName: selectedPlan.name,
      description: selectedPlan.description,
      quantity: 1,
      price: selectedPlan.price,
    });
  };

  const handleToggleAddOn = (addOn: PresetService) => {
    const existingItems = form.getValues('items') ?? [];
    const addOnId = buildPresetId('addon', addOn.name);
    const existingIndex = existingItems.findIndex((item) => item.id === addOnId);

    if (existingIndex >= 0) {
      remove(existingIndex);
      return;
    }

    append({
      id: addOnId,
      serviceName: addOn.name,
      description: addOn.recurring
        ? `${addOn.description} (Recurring monthly)`
        : addOn.description,
      quantity: 1,
      price: addOn.price,
    });
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data as CreateReceiptData);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Client Info */}
      <section className="rounded-2xl border border-[#1E222C] bg-[#10131A]/95 p-6">
        <h3 className="mb-4 font-semibold text-[#F4F5F7]">Client Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="clientName">Client Name *</Label>
            <Input id="clientName" {...form.register('clientName')} placeholder="John Doe" />
            {form.formState.errors.clientName && (
              <p className="text-xs text-[#FFB3BE]">{form.formState.errors.clientName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="clientEmail">Client Email *</Label>
            <Input id="clientEmail" type="email" {...form.register('clientEmail')} placeholder="john@example.com" />
            {form.formState.errors.clientEmail && (
              <p className="text-xs text-[#FFB3BE]">{form.formState.errors.clientEmail.message}</p>
            )}
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="companyName">Company Name (optional)</Label>
            <Input id="companyName" {...form.register('companyName')} placeholder="Acme Corp" />
          </div>
        </div>
      </section>

      {/* Receipt Details */}
      <section className="rounded-2xl border border-[#1E222C] bg-[#10131A]/95 p-6">
        <h3 className="mb-4 font-semibold text-[#F4F5F7]">Receipt Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="issueDate">Issue Date *</Label>
            <Input id="issueDate" type="date" {...form.register('issueDate')} />
            {form.formState.errors.issueDate && (
              <p className="text-xs text-[#FFB3BE]">{form.formState.errors.issueDate.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dueDate">Due Date (optional)</Label>
            <Select
              value={dueDatePreset}
              onValueChange={(value) => setDueDatePreset(value as DueDatePreset)}
            >
              <SelectTrigger id="dueDatePreset" className="mb-2 border-[#2A3040] bg-[#0C1017] text-[#DEE4EF]">
                <SelectValue placeholder="Custom" />
              </SelectTrigger>
              <SelectContent className="border-[#2A3040] bg-[#111722] text-[#DEE4EF]">
                <SelectItem value="custom">Custom date</SelectItem>
                <SelectItem value="1w">1 week after issue date</SelectItem>
                <SelectItem value="2w">2 weeks after issue date</SelectItem>
                <SelectItem value="1m">1 month after issue date</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="dueDate"
              type="date"
              {...dueDateField}
              onChange={(event) => {
                dueDateField.onChange(event);
                setDueDatePreset('custom');
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={defaultValues?.status ?? 'draft'}
              onValueChange={(v) => form.setValue('status', v as 'draft' | 'sent' | 'paid')}
            >
              <SelectTrigger id="status" className="border-[#2A3040] bg-[#0C1017] text-[#DEE4EF]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[#2A3040] bg-[#111722] text-[#DEE4EF]">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="rounded-2xl border border-[#1E222C] bg-[#10131A]/95 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#F4F5F7]">Services</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-[#2A3040] bg-[#121621] text-[#DDE3ED] hover:bg-[#181E2C] hover:text-white"
            onClick={() => append(newItem())}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Service
          </Button>
        </div>

        <div className="mb-5 space-y-4 rounded-xl border border-[#252C3B] bg-[#0E131F] p-4">
          <div className="space-y-1.5">
            <Label>Select Plan</Label>
            <Select
              value={selectedPlanName || 'none'}
              onValueChange={handleSelectPlan}
            >
              <SelectTrigger className="border-[#2A3040] bg-[#0C1017] text-[#DEE4EF]">
                <SelectValue placeholder="Choose a plan" />
              </SelectTrigger>
              <SelectContent className="border-[#2A3040] bg-[#111722] text-[#DEE4EF]">
                <SelectItem value="none">No plan selected</SelectItem>
                {planOptions.map((plan) => (
                  <SelectItem key={plan.name} value={plan.name}>
                    {plan.name} (${plan.price.toLocaleString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quick Add Add-ons</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {addOnOptions.map((addOn) => {
                const addOnId = buildPresetId('addon', addOn.name);
                const checked = items.some((item) => item.id === addOnId);
                const displayPrice = `$${addOn.price.toLocaleString()}${addOn.recurring ? '/mo' : ''}`;

                return (
                  <label
                    key={addOn.name}
                    className="flex items-center justify-between gap-3 rounded-md border border-[#2A3040] bg-[#10151F] px-3 py-2 text-sm text-[#DDE3ED]"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleAddOn(addOn)}
                        className="h-4 w-4 accent-[#0047FF]"
                      />
                      <span>{addOn.name}</span>
                    </span>
                    <span className="font-medium text-[#9AA3B9]">{displayPrice}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {form.formState.errors.items?.root && (
          <p className="mb-3 text-xs text-[#FFB3BE]">{form.formState.errors.items.root.message}</p>
        )}

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-12 items-start gap-3 rounded-xl border border-[#252C3B] bg-[#0E131F] p-4">
              <div className="col-span-12 sm:col-span-4 space-y-1">
                <Label className="text-xs">Service Name *</Label>
                <Input
                  {...form.register(`items.${index}.serviceName`)}
                  placeholder="Web Design"
                />
                {form.formState.errors.items?.[index]?.serviceName && (
                  <p className="text-xs text-[#FFB3BE]">
                    {form.formState.errors.items[index]?.serviceName?.message}
                  </p>
                )}
              </div>
              <div className="col-span-12 sm:col-span-3 space-y-1">
                <Label className="text-xs">Description</Label>
                <Input
                  {...form.register(`items.${index}.description`)}
                  placeholder="Homepage design"
                />
              </div>
              <div className="col-span-4 sm:col-span-2 space-y-1">
                <Label className="text-xs">Qty</Label>
                <Input
                  type="number"
                  min="1"
                  {...form.register(`items.${index}.quantity`)}
                />
              </div>
              <div className="col-span-6 sm:col-span-2 space-y-1">
                <Label className="text-xs">Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  {...form.register(`items.${index}.price`)}
                />
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-end pb-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-[#F49AA6] hover:bg-[#3B1C25] hover:text-[#FFD1D8]"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Summary */}
      <section className="rounded-2xl border border-[#1E222C] bg-[#10131A]/95 p-6">
        <h3 className="mb-4 font-semibold text-[#F4F5F7]">Financial Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="tax">Tax (%)</Label>
            <Input id="tax" type="number" min="0" max="100" step="0.1" {...form.register('tax')} placeholder="0" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="discount">Discount ($)</Label>
            <Input id="discount" type="number" min="0" step="0.01" {...form.register('discount')} placeholder="0.00" />
          </div>
        </div>

        <div className="mt-6 space-y-2 border-t border-[#1E222C] pt-4">
          <div className="flex justify-between text-sm text-[#9AA3B9]">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#9AA3B9]">
            <span>Tax ({tax}%)</span>
            <span>${taxAmt.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#9AA3B9]">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-[#1E222C] pt-2 text-base font-bold text-[#F4F5F7]">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="rounded-2xl border border-[#1E222C] bg-[#10131A]/95 p-6">
        <h3 className="mb-4 font-semibold text-[#F4F5F7]">Notes</h3>
        <Textarea
          {...form.register('notes')}
          placeholder="Additional notes or payment instructions for the client..."
          rows={3}
        />
      </section>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading} size="lg">
          {loading ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
