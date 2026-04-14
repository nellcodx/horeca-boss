import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import AuthCard from '@/components/AuthCard';

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, hsl(0 78% 52%) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, hsl(0 78% 52%) 0%, transparent 70%)' }} />
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
