import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import AuthCard from '@/components/AuthCard';

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Accent background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, hsl(1 76% 55%) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, hsl(1 76% 55%) 0%, transparent 65%)' }} />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(ellipse, hsl(1 76% 55%) 0%, transparent 70%)' }} />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(1 76% 55%) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">
            HoReCa <span className="text-primary">BOSS</span>
          </h1>
          <p className="text-muted-foreground">Система управління закладом</p>
        </div>

        <AuthCard />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/home')}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-sm font-medium"
        >
          <LogIn className="w-4 h-4" />
          Увійти без авторизації (тест)
        </motion.button>

        <p className="text-center mt-6 text-xs text-muted-foreground">MVP Demo • HoReCa BOSS</p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
