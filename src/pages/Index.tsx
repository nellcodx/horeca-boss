import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Utensils, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Subtle red-white gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, hsl(0 78% 52%) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(0 78% 52%) 0%, transparent 70%)' }} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-heading font-bold tracking-tight mb-2">
          HoReCa <span className="text-primary">BOSS</span>
        </h1>
        <p className="text-muted-foreground text-lg">Система управління закладом</p>
      </motion.div>

      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Customer */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/customer')}
          className="group relative overflow-hidden p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-5">
            <Utensils className="w-7 h-7" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-card-foreground mb-2">Зона клієнта</h2>
          <p className="text-sm text-muted-foreground mb-4">Меню, замовлення, бронювання столика — без реєстрації</p>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <span>Увійти</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        {/* Staff */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/staff')}
          className="group relative overflow-hidden p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-5">
            <Users className="w-7 h-7" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-card-foreground mb-2">Зона персоналу</h2>
          <p className="text-sm text-muted-foreground mb-4">Управління залом, кухня, адміністрування, аналітика</p>
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
