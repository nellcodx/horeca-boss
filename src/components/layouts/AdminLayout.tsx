import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Settings, ArrowLeft, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/contexts/RoleContext';
import { roleLabels } from '@/data/mock';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Дашборд', end: true },
  { to: '/admin/menu', icon: BookOpen, label: 'Меню', end: false },
  { to: '/admin/staff', icon: Users, label: 'Персонал', end: false },
  { to: '/admin/settings', icon: Settings, label: 'Налаштування', end: false },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { role } = useRole();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col">
        <div className="p-6 border-b border-border">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Назад</span>
          </button>
          <h1 className="font-heading font-bold text-xl">HoReCa <span className="text-primary">BOSS</span></h1>
          {role && <p className="text-xs text-muted-foreground mt-1">{roleLabels[role].ua}</p>}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-lg">Адмін панель</h1>
        </header>

        <main className="flex-1 p-6">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden sticky bottom-0 bg-card/90 backdrop-blur-lg border-t border-border">
          <div className="flex justify-around py-2">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => cn(
                  'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};
