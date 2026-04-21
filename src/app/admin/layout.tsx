'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Receipt, PlusCircle, Menu, ShieldCheck, LogOut } from 'lucide-react';
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
  { href: '/admin/audit', label: 'Audit Log', icon: ShieldCheck, exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return children;
  }

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' }).catch(() => undefined);
    router.replace('/admin/login');
    router.refresh();
  };

  const navContent = (
    <>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href) && href !== '/admin';
          const isAdminRoot = href === '/admin' && pathname === '/admin';
          const isActive = isAdminRoot || active;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'border-primary/60 bg-primary/15 text-white shadow-[0_0_0_1px_rgba(0,71,255,0.4)]'
                  : 'border-transparent text-admin-secondary hover:border-admin-border-nav-hover hover:bg-admin-nav-hover hover:text-admin-text'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-admin-dim-icon group-hover:text-admin-accent-text')} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-admin-border p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full border-admin-border-bright bg-admin-btn text-admin-btn-text hover:bg-admin-btn-hover hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
        <Link href="/" className="mt-3 inline-block text-xs text-admin-link transition-colors hover:text-admin-link-hover">
          ← Back to Website
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-admin-bg text-admin-text">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_-10%_-10%,rgba(0,71,255,0.18),transparent_60%),radial-gradient(800px_500px_at_110%_120%,rgba(0,71,255,0.16),transparent_65%)]" />
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-admin-border-soft bg-admin-surface/95 backdrop-blur md:flex print:hidden">
          <div className="border-b border-admin-border p-5">
            <Link href="/admin" className="flex items-center gap-3">
              <img src="/logo.png" alt="Code Heaven Studio" className="h-9 w-9 rounded-lg border border-admin-border-bright bg-admin-logo-bg p-1 object-contain" />
              <div>
                <p className="text-sm font-semibold tracking-tight text-white">Code Heaven Studio</p>
                <p className="text-xs uppercase tracking-[0.14em] text-admin-dim">Admin Control</p>
              </div>
            </Link>
          </div>
          {navContent}
        </aside>

        <main className="min-w-0 flex-1 overflow-auto">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-admin-border-soft bg-admin-surface-alt/90 px-4 py-3 backdrop-blur md:hidden print:hidden">
            <Link href="/admin" className="flex items-center gap-2">
              <img src="/logo.png" alt="Code Heaven Studio" className="h-7 w-7 rounded-md border border-admin-border-bright bg-admin-logo-bg p-1 object-contain" />
              <span className="text-sm font-semibold tracking-tight text-white">Admin Control</span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Open navigation menu"
                  className="border-admin-border-bright bg-admin-btn text-admin-btn-text-alt hover:bg-admin-btn-hover hover:text-white"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88%] max-w-xs border-r border-admin-border-soft bg-admin-surface p-0 text-white">
                <SheetHeader className="border-b border-admin-border p-4 text-left">
                  <SheetTitle className="text-white">Admin Navigation</SheetTitle>
                  <SheetDescription className="text-admin-description">Manage dashboard and receipts</SheetDescription>
                </SheetHeader>
                <div className="flex h-[calc(100%-84px)] flex-col">{navContent}</div>
              </SheetContent>
            </Sheet>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
