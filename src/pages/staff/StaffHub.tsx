import { useNavigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { UserRole, roleLabels } from '@/data/mock';
import { motion } from 'framer-motion';
import { ChefHat, Users, UtensilsCrossed, ShieldCheck, Store, Receipt, ArrowLeft } from 'lucide-react';

const staffCards: { role: UserRole; icon: React.ReactNode; path: string; desc: string }[] = [
  { role: 'waiter', icon: <UtensilsCrossed className="w-7 h-7" />, path: '/staff/floor', desc: 'Зал, замовлення, рахунки' },
  { role: 'kitchen', icon: <ChefHat className="w-7 h-7" />, path: '/staff/kitchen', desc: 'Черга замовлень, статуси' },
  { role: 'cashier', icon: <Receipt className="w-7 h-7" />, path: '/staff/floor', desc: 'Оплата, чеки, каса' },
  { role: 'manager', icon: <Users className="w-7 h-7" />, path: '/staff/dashboard', desc: 'Аналітика, персонал, меню' },
  { role: 'owner', icon: <Store className="w-7 h-7" />, path: '/staff/dashboard', desc: 'Повний доступ до системи' },
  { role: 'super_admin', icon: <ShieldCheck className="w-7 h-7" />, path: '/staff/dashboard', desc: 'Адміністрування всіх локацій' },
];

const StaffHub = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleSelect = (role: UserRole, path: string) => {
    setRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, hsl(1 76% 55%) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, hsl(1 76% 55%) 0%, transparent 65%)' }} />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(ellipse, hsl(1 76% 55%) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(1 76% 55%) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">На головну</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">
            Зона <span className="text-primary">персоналу</span>
          </h1>
          <p className="text-muted-foreground">Оберіть вашу роль для входу</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {staffCards.map(({ role, icon, path, desc }, i) => (
            <motion.button
              key={role}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => handleSelect(role, path)}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-white/40 bg-white/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_8px_32px_rgba(229,57,53,0.12)] hover:border-primary/40 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {icon}
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm text-foreground">{roleLabels[role].ua}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{desc}</div>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-center mt-8 text-xs text-muted-foreground">
          У майбутньому — вхід через email + пароль або PIN
        </p>
      </motion.div>
    </div>
  );
};

export default StaffHub;
