'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, Receipt, PlusCircle, Menu, ShieldCheck, BookOpen, FilePen, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/receipts', label: 'Receipts', icon: Receipt, exact: false },
  { href: '/admin/receipts/new', label: 'New Receipt', icon: PlusCircle, exact: true },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen, exact: false },
  { href: '/admin/blog/new', label: 'New Post', icon: FilePen, exact: true },
  { href: '/admin/audit', label: 'Audit Log', icon: ShieldCheck, exact: false },
  { href: '/admin/bin', label: 'Bin', icon: Trash2, exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);

  if (pathname === '/admin/login') {
    return children;
  }

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' }).catch(() => undefined);
    router.replace('/admin/login');
    router.refresh();
  };

  const navContent = (onItemClick?: () => void) => (
    <>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href) && href !== '/admin';
          const isAdminRoot = href === '/admin' && pathname === '/admin';
          const isActive = isAdminRoot || active;
          return (
            <Link
              key={href}
              href={href}
              onClick={onItemClick}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col gap-3">
          <Button variant="outline" size="sm" onClick={logout}>
            Log out
          </Button>
          <Link
            href="/"
            onClick={onItemClick}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col print:hidden">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Code Heaven Studio" className="h-8 w-8 object-contain" />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">Code Heaven</p>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </Link>
        </div>
        {navContent()}
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">
        <header className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between print:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/logo.png" alt="Code Heaven Studio" className="h-7 w-7 object-contain" />
            <span className="text-sm font-semibold text-gray-900">Admin Portal</span>
          </Link>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Open navigation menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[85%] max-w-xs">
              <SheetHeader className="p-4 border-b border-gray-200">
                <SheetTitle>Admin Navigation</SheetTitle>
                <SheetDescription>Manage dashboard and receipts</SheetDescription>
              </SheetHeader>
              <div className="flex h-[calc(100%-84px)] flex-col">{navContent(() => setSheetOpen(false))}</div>
            </SheetContent>
          </Sheet>
        </header>

        {children}
      </main>
    </div>
  );
}
