import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, ClipboardList, ArrowLeft, Moon, Sun } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';
import { cn } from '@/lib/utils';

const tabs = [
  { to: '/staff/floor', icon: LayoutGrid, label: 'Зал' },
  { to: '/staff/orders', icon: ClipboardList, label: 'Замовлення' },
];

export const WaiterLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useRole();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/staff')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-lg">Офіціант</h1>
        </div>
        <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      <main className="flex-1 p-4">
        {children}
      </main>

      <nav className="sticky bottom-0 bg-card/90 backdrop-blur-lg border-t border-border">
        <div className="flex">
          {tabs.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/staff/floor'}
              className={({ isActive }) => cn(
                'flex-1 flex items-center justify-center gap-3 py-4 text-lg font-semibold transition-colors',
                isActive ? 'text-primary border-t-2 border-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-6 h-6" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
