import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Utensils } from 'lucide-react';

const CustomerQR = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const { setTableNumber } = useCart();

  useEffect(() => {
    if (tableId) {
      setTableNumber(parseInt(tableId));
    }
  }, [tableId, setTableNumber]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <QrCode className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-3xl mb-2">Welcome!</h1>
          <p className="text-muted-foreground">
            Table <span className="font-bold text-foreground">#{tableId || '—'}</span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Browse the menu, add dishes to your cart, and place your order right from your phone
        </p>
        <button
          onClick={() => navigate('/customer')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
        >
          <Utensils className="w-5 h-5" />
          Open Menu
        </button>
      </motion.div>
    </div>
  );
};

export default CustomerQR;
