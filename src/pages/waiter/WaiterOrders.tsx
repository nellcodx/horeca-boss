import { useState } from 'react';
import { WaiterLayout } from '@/components/layouts/WaiterLayout';
import { orders as initialOrders, Order } from '@/data/mock';
import { cn } from '@/lib/utils';
import { Clock, ChefHat, CheckCircle2 } from 'lucide-react';

const statusFlow: Order['status'][] = ['new', 'in_progress', 'ready', 'served', 'paid'];
const statusLabels: Record<Order['status'], { label: string; icon: React.ReactNode; color: string }> = {
  new: { label: 'Нове', icon: <Clock className="w-5 h-5" />, color: 'bg-warning text-warning-foreground' },
  in_progress: { label: 'Готується', icon: <ChefHat className="w-5 h-5" />, color: 'bg-primary text-primary-foreground' },
  ready: { label: 'Готово', icon: <CheckCircle2 className="w-5 h-5" />, color: 'bg-success text-success-foreground' },
  served: { label: 'Подано', icon: <CheckCircle2 className="w-5 h-5" />, color: 'bg-muted text-muted-foreground' },
  paid: { label: 'Оплачено', icon: <CheckCircle2 className="w-5 h-5" />, color: 'bg-muted text-muted-foreground' },
};

const WaiterOrders = () => {
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);

  const advanceStatus = (orderId: string) => {
    setOrdersList(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const idx = statusFlow.indexOf(o.status);
      if (idx < statusFlow.length - 1) return { ...o, status: statusFlow[idx + 1] };
      return o;
    }));
  };

  const timeAgo = (dateStr: string) => {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    return `${mins} хв`;
  };

  return (
    <WaiterLayout>
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-xl">Замовлення</h2>
        {ordersList.map(order => {
          const st = statusLabels[order.status];
          return (
            <div key={order.id} className="p-5 rounded-2xl bg-card border border-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-heading font-bold text-foreground">Стіл #{order.tableNumber}</span>
                  <span className={cn('px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5', st.color)}>
                    {st.icon}{st.label}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{timeAgo(order.createdAt)} тому</span>
              </div>
              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-card-foreground">{item.quantity}x {item.menuItem.name}</span>
                    <span className="text-muted-foreground">{item.menuItem.price * item.quantity} ₴</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-bold text-lg text-foreground">{order.total} ₴</span>
                {order.status !== 'paid' && (
                  <button
                    onClick={() => advanceStatus(order.id)}
                    className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
                  >
                    {order.status === 'ready' ? 'Подати' : order.status === 'served' ? 'Оплачено' : 'Далі →'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </WaiterLayout>
  );
};

export default WaiterOrders;
