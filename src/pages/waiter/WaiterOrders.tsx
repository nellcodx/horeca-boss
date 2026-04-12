import { useState } from 'react';
import { WaiterLayout } from '@/components/layouts/WaiterLayout';
import { orders as initialOrders, Order } from '@/data/mock';
import { cn } from '@/lib/utils';
import { Clock, ChefHat, CheckCircle2, Receipt, SplitSquareHorizontal, X } from 'lucide-react';
import { toast } from 'sonner';

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
  const [billOrder, setBillOrder] = useState<Order | null>(null);
  const [splitCount, setSplitCount] = useState(1);

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

  const handlePrintBill = (order: Order) => {
    setBillOrder(order);
    setSplitCount(1);
  };

  const handleConfirmBill = () => {
    if (billOrder) {
      toast.success(`Рахунок для столу #${billOrder.tableNumber} роздруковано${splitCount > 1 ? ` (${splitCount} частини)` : ''}`);
      setBillOrder(null);
    }
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
                <div className="flex gap-2">
                  {(order.status === 'served' || order.status === 'ready') && (
                    <button
                      onClick={() => handlePrintBill(order)}
                      className="px-4 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm flex items-center gap-2 hover:bg-muted transition-colors"
                    >
                      <Receipt className="w-4 h-4" />
                      Рахунок
                    </button>
                  )}
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
            </div>
          );
        })}
      </div>

      {/* Bill modal */}
      {billOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-card border border-border shadow-xl">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">Рахунок • Стіл #{billOrder.tableNumber}</h3>
              <button onClick={() => setBillOrder(null)} className="p-1 rounded-lg hover:bg-muted text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {billOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-card-foreground">{item.quantity}x {item.menuItem.name}</span>
                  <span className="font-medium text-card-foreground">{item.menuItem.price * item.quantity} ₴</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>Разом</span>
                <span className="text-primary">{billOrder.total} ₴</span>
              </div>

              {splitCount > 1 && (
                <div className="p-3 rounded-lg bg-accent/50 text-center">
                  <span className="text-sm text-accent-foreground font-medium">
                    {splitCount} частини × {Math.ceil(billOrder.total / splitCount)} ₴
                  </span>
                </div>
              )}

              {/* Split bill */}
              <div className="flex items-center gap-3">
                <SplitSquareHorizontal className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-card-foreground">Розділити рахунок:</span>
                <div className="flex gap-2 ml-auto">
                  {[1, 2, 3, 4].map(n => (
                    <button
                      key={n}
                      onClick={() => setSplitCount(n)}
                      className={cn(
                        'w-9 h-9 rounded-lg text-sm font-bold transition-colors',
                        splitCount === n ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-border">
              <button
                onClick={handleConfirmBill}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
              >
                Друкувати рахунок
              </button>
            </div>
          </div>
        </div>
      )}
    </WaiterLayout>
  );
};

export default WaiterOrders;
