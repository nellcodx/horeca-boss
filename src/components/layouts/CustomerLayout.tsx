import { ReactNode } from 'react';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { Home, Search, ShoppingCart, CalendarDays, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const tabs = [
  { to: '/customer', icon: Home, label: 'Меню' },
  { to: '/customer/cart', icon: ShoppingCart, label: 'Кошик' },
  { to: '/customer/reservation', icon: CalendarDays, label: 'Бронь' },
];

export const CustomerLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { items } = useCart();
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-bold text-lg">HoReCa <span className="text-primary">BOSS</span></h1>
      </header>

      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/90 backdrop-blur-lg border-t border-border z-30">
        <div className="flex justify-around py-2">
          {tabs.map(({ to, icon: Icon, label }) => (
            <RouterNavLink
              key={to}
              to={to}
              end={to === '/customer'}
              className={({ isActive }) => cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors relative',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {label === 'Кошик' && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium">{label}</span>
            </RouterNavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
