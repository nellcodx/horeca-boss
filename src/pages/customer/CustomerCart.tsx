import { useState } from 'react';
import { CustomerLayout } from '@/components/layouts/CustomerLayout';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Banknote, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type PaymentMethod = 'card' | 'cash' | 'apple_pay';
type CheckoutStep = 'cart' | 'payment' | 'success';

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'card', label: 'Картка', icon: <CreditCard className="w-5 h-5" />, desc: 'Visa, Mastercard' },
  { id: 'cash', label: 'Готівка', icon: <Banknote className="w-5 h-5" />, desc: 'Оплата офіціанту' },
  { id: 'apple_pay', label: 'Apple Pay', icon: <Smartphone className="w-5 h-5" />, desc: 'Безконтактна оплата' },
];

const CustomerCart = () => {
  const { items, updateQuantity, removeItem, clearCart, total, tableNumber, setTableNumber } = useCart();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<string>(tableNumber?.toString() || '');
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [orderNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));

  const handleProceedToPayment = () => {
    if (!selectedTable) {
      toast.error('Оберіть номер столика');
      return;
    }
    if (items.length === 0) return;
    setTableNumber(parseInt(selectedTable));
    setStep('payment');
  };

  const handlePay = () => {
    setStep('success');
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (step === 'success') {
    return (
      <CustomerLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-[70vh] px-4 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h2 className="font-heading font-bold text-2xl mb-2">Замовлення оформлено!</h2>
          <p className="text-muted-foreground mb-1">Замовлення #{orderNumber}</p>
          <p className="text-muted-foreground text-sm mb-6">Стіл #{selectedTable} • {total} ₴</p>
          <p className="text-sm text-muted-foreground mb-6">
            {selectedPayment === 'cash' ? 'Оплата готівкою офіціанту' : 'Оплата пройшла успішно'}
          </p>
          <button
            onClick={() => { setStep('cart'); navigate('/customer'); }}
            className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Повернутися до меню
          </button>
        </motion.div>
      </CustomerLayout>
    );
  }

  if (items.length === 0 && step === 'cart') {
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
        <AnimatePresence mode="wait">
          {step === 'cart' && (
            <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h2 className="font-heading font-bold text-xl">Ваше замовлення</h2>

              {/* Table selection */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <label className="text-sm font-medium text-card-foreground block mb-2">Номер столика</label>
                <input
                  type="number" min="1" max="20"
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

              {/* Total & proceed */}
              <div className="p-4 rounded-xl bg-card border border-border space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Разом</span>
                  <span className="text-primary">{total} ₴</span>
                </div>
                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  До оплати
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep('cart')} className="text-muted-foreground hover:text-foreground text-sm">← Назад</button>
                <h2 className="font-heading font-bold text-xl">Оплата</h2>
              </div>

              {/* Order summary */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Стіл #{selectedTable}</div>
                <div className="flex justify-between font-bold text-lg">
                  <span>До сплати</span>
                  <span className="text-primary">{total} ₴</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{items.length} позицій</div>
              </div>

              {/* Payment methods */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">Спосіб оплати</label>
                {paymentMethods.map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm.id)}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                      selectedPayment === pm.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30'
                    )}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      selectedPayment === pm.id ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                    )}>
                      {pm.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm text-card-foreground">{pm.label}</div>
                      <div className="text-xs text-muted-foreground">{pm.desc}</div>
                    </div>
                    {selectedPayment === pm.id && (
                      <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </button>
                ))}
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
              >
                {selectedPayment === 'cash' ? 'Підтвердити замовлення' : `Сплатити ${total} ₴`}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CustomerLayout>
  );
};

export default CustomerCart;
