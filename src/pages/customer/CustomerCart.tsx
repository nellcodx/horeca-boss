import { useState } from 'react';
import { CustomerLayout } from '@/components/layouts/CustomerLayout';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const CustomerCart = () => {
  const { items, updateQuantity, removeItem, clearCart, total, tableNumber, setTableNumber } = useCart();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<string>(tableNumber?.toString() || '');

  const handleOrder = () => {
    if (!selectedTable) {
      toast.error('Оберіть номер столика');
      return;
    }
    setTableNumber(parseInt(selectedTable));
    toast.success('Замовлення відправлено! 🎉');
    clearCart();
    navigate('/customer');
  };

  if (items.length === 0) {
    return (
      <CustomerLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="font-heading font-bold text-xl mb-2">Кошик порожній</h2>
          <p className="text-muted-foreground text-sm">Додайте страви з меню</p>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="px-4 pt-4 space-y-4">
        <h2 className="font-heading font-bold text-xl">Ваше замовлення</h2>

        {/* Table selection */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <label className="text-sm font-medium text-card-foreground block mb-2">Номер столика</label>
          <input
            type="number"
            min="1"
            max="20"
            value={selectedTable}
            onChange={e => setSelectedTable(e.target.value)}
            placeholder="Введіть номер"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        {/* Items */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={item.menuItem.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-card-foreground">{item.menuItem.name}</h3>
                <p className="text-primary font-bold text-sm">{item.menuItem.price * item.quantity} ₴</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Plus className="w-3 h-3" />
                </button>
                <button onClick={() => removeItem(item.menuItem.id)} className="w-7 h-7 rounded-full bg-destructive/10 text-destructive flex items-center justify-center ml-1">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total & Order */}
        <div className="p-4 rounded-xl bg-card border border-border space-y-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Разом</span>
            <span className="text-primary">{total} ₴</span>
          </div>
          <button
            onClick={handleOrder}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Замовити
          </button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerCart;
