import { useNavigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { UserRole, roleLabels } from '@/data/mock';
import { motion } from 'framer-motion';
import { ChefHat, Users, UtensilsCrossed, ShieldCheck, Store, Receipt, User, Utensils } from 'lucide-react';

const customerCard = { role: 'customer' as UserRole, icon: <User className="w-8 h-8" />, path: '/customer' };

const staffCards: { role: UserRole; icon: React.ReactNode; path: string }[] = [
  { role: 'waiter', icon: <UtensilsCrossed className="w-7 h-7" />, path: '/waiter' },
  { role: 'kitchen', icon: <ChefHat className="w-7 h-7" />, path: '/kitchen' },
  { role: 'cashier', icon: <Receipt className="w-7 h-7" />, path: '/waiter' },
  { role: 'manager', icon: <Users className="w-7 h-7" />, path: '/admin' },
  { role: 'owner', icon: <Store className="w-7 h-7" />, path: '/admin' },
  { role: 'super_admin', icon: <ShieldCheck className="w-7 h-7" />, path: '/admin' },
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
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-heading font-bold tracking-tight mb-2">
          HoReCa <span className="text-primary">BOSS</span>
        </h1>
        <p className="text-muted-foreground text-lg">Система управління закладом</p>
      </motion.div>

      <div className="w-full max-w-3xl space-y-8">
        {/* Customer Zone */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            Зона клієнта
          </h2>
          <button
            onClick={() => handleSelect(customerCard.role, customerCard.path)}
            className="group w-full flex items-center gap-5 p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {customerCard.icon}
            </div>
            <div className="text-left">
              <div className="font-bold text-lg text-card-foreground">{roleLabels[customerCard.role].ua}</div>
              <p className="text-sm text-muted-foreground">Меню, замовлення, бронювання — без реєстрації</p>
            </div>
          </button>
        </motion.section>

        {/* Staff Zone */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Зона персоналу
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {staffCards.map(({ role, icon, path }, i) => (
              <motion.button
                key={role}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                onClick={() => handleSelect(role, path)}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {icon}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm text-card-foreground">{roleLabels[role].ua}</div>
                  <div className="text-xs text-muted-foreground">{roleLabels[role].en}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">MVP Demo • Оберіть роль для перегляду</p>
    </div>
  );
};

export default Index;
