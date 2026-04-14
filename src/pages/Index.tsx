import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Utensils, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

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
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-heading font-bold tracking-tight mb-2">
          HoReCa <span className="text-primary">BOSS</span>
        </h1>
        <p className="text-muted-foreground text-lg">Оберіть зону для роботи</p>
      </motion.div>

      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/customer')}
          className="group relative overflow-hidden p-8 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_8px_32px_rgba(229,57,53,0.12)] hover:border-primary/40 transition-all duration-300 text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mb-5">
            <Utensils className="w-7 h-7" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-card-foreground mb-2">Зона клієнта</h2>
          <p className="text-sm text-muted-foreground mb-4">Меню, замовлення, бронювання столика</p>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <span>Увійти</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/staff')}
          className="group relative overflow-hidden p-8 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_8px_32px_rgba(229,57,53,0.12)] hover:border-primary/40 transition-all duration-300 text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mb-5">
            <Users className="w-7 h-7" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-card-foreground mb-2">Зона персоналу</h2>
          <p className="text-sm text-muted-foreground mb-4">Управління залом, кухня, аналітика</p>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <span>Увійти</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">MVP Demo • HoReCa BOSS</p>
    </div>
  );
};

export default Index;
