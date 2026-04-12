import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orders as initialOrders, Order } from '@/data/mock';
import { cn } from '@/lib/utils';
import { ArrowLeft, Clock, ChefHat, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'НОВЕ', color: 'text-warning-foreground', bg: 'bg-warning' },
  in_progress: { label: 'ГОТУЄТЬСЯ', color: 'text-primary-foreground', bg: 'bg-primary' },
  ready: { label: 'ГОТОВО', color: 'text-success-foreground', bg: 'bg-success' },
};

const KitchenDisplay = () => {
  const navigate = useNavigate();
  const [ordersList, setOrdersList] = useState<Order[]>(
    initialOrders.filter(o => ['new', 'in_progress', 'ready'].includes(o.status))
  );

  const advanceStatus = (orderId: string) => {
    setOrdersList(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      if (o.status === 'new') return { ...o, status: 'in_progress' };
      if (o.status === 'in_progress') return { ...o, status: 'ready' };
      return o;
    }));
  };

  const timeAgo = (dateStr: string) => {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    return `${mins} хв`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-xl flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-primary" />
            Кухня
          </h1>
        </div>
        <div className="flex gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-warning text-warning-foreground font-semibold">
            Нових: {ordersList.filter(o => o.status === 'new').length}
          </span>
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
            В роботі: {ordersList.filter(o => o.status === 'in_progress').length}
          </span>
        </div>
      </header>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordersList
          .sort((a, b) => {
            const priority = { new: 0, in_progress: 1, ready: 2 };
            return (priority[a.status as keyof typeof priority] || 3) - (priority[b.status as keyof typeof priority] || 3);
          })
          .map((order, i) => {
            const cfg = statusConfig[order.status] || statusConfig.new;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'rounded-2xl border-2 overflow-hidden transition-all',
                  order.status === 'new' ? 'border-warning' : order.status === 'in_progress' ? 'border-primary' : 'border-success'
                )}
              >
                <div className={cn('px-4 py-3 flex items-center justify-between', cfg.bg)}>
                  <span className={cn('font-bold text-lg', cfg.color)}>Стіл #{order.tableNumber}</span>
                  <div className="flex items-center gap-2">
                    <Clock className={cn('w-4 h-4', cfg.color)} />
                    <span className={cn('text-sm font-semibold', cfg.color)}>{timeAgo(order.createdAt)}</span>
                  </div>
                </div>
                <div className="p-4 bg-card space-y-2">
                  {order.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3 text-base">
                      <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                        {item.quantity}x
                      </span>
                      <span className="font-medium text-card-foreground">{item.menuItem.name}</span>
                    </div>
                  ))}
                </div>
                {order.status !== 'ready' && (
                  <div className="p-3 bg-card border-t border-border">
                    <button
                      onClick={() => advanceStatus(order.id)}
                      className={cn(
                        'w-full py-4 rounded-xl font-bold text-lg transition-opacity hover:opacity-90',
                        order.status === 'new' ? 'bg-primary text-primary-foreground' : 'bg-success text-success-foreground'
                      )}
                    >
                      {order.status === 'new' ? 'Почати готувати' : 'Готово ✓'}
                    </button>
                  </div>
                )}
                {order.status === 'ready' && (
                  <div className="p-4 bg-success/10 text-center">
                    <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-1" />
                    <span className="font-bold text-success">Чекає на видачу</span>
                  </div>
                )}
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default KitchenDisplay;
