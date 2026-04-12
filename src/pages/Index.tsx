import { useNavigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { UserRole, roleLabels } from '@/data/mock';
import { motion } from 'framer-motion';
import { ChefHat, Users, UtensilsCrossed, ShieldCheck, Store, Receipt, User } from 'lucide-react';

const roleCards: { role: UserRole; icon: React.ReactNode; color: string; path: string }[] = [
  { role: 'customer', icon: <User className="w-8 h-8" />, color: 'bg-primary', path: '/customer' },
  { role: 'waiter', icon: <UtensilsCrossed className="w-8 h-8" />, color: 'bg-primary', path: '/waiter' },
  { role: 'kitchen', icon: <ChefHat className="w-8 h-8" />, color: 'bg-primary', path: '/kitchen' },
  { role: 'cashier', icon: <Receipt className="w-8 h-8" />, color: 'bg-primary', path: '/waiter' },
  { role: 'manager', icon: <Users className="w-8 h-8" />, color: 'bg-primary', path: '/admin' },
  { role: 'owner', icon: <Store className="w-8 h-8" />, color: 'bg-primary', path: '/admin' },
  { role: 'super_admin', icon: <ShieldCheck className="w-8 h-8" />, color: 'bg-primary', path: '/admin' },
];

const Index = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleSelect = (role: UserRole, path: string) => {
    setRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-heading font-bold tracking-tight mb-2">
          HoReCa <span className="text-primary">BOOS</span>
        </h1>
        <p className="text-muted-foreground text-lg">Система управління закладом</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl w-full">
        {roleCards.map(({ role, icon, path }, i) => (
          <motion.button
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => handleSelect(role, path)}
            className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {icon}
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm text-card-foreground">{roleLabels[role].ua}</div>
              <div className="text-xs text-muted-foreground">{roleLabels[role].en}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground">MVP Demo • Оберіть роль для перегляду</p>
    </div>
  );
};

export default Index;
