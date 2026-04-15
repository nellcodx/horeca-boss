import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChefHat, Clock, CheckCircle2, AlertTriangle, GripVertical } from 'lucide-react';
import { useState } from 'react';
import { orders as initialOrders, Order } from '@/data/mock';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface KitchenOrder extends Order {
  priority: 'normal' | 'urgent';
}

const columns: { status: string; label: string; icon: React.ReactNode; headerBg: string; borderColor: string }[] = [
  { status: 'new', label: 'New', icon: <Clock className="w-5 h-5" />, headerBg: 'bg-warning', borderColor: 'border-warning' },
  { status: 'in_progress', label: 'In Progress', icon: <ChefHat className="w-5 h-5" />, headerBg: 'bg-primary', borderColor: 'border-primary' },
  { status: 'ready', label: 'Ready', icon: <CheckCircle2 className="w-5 h-5" />, headerBg: 'bg-success', borderColor: 'border-success' },
];

const KitchenDisplay = () => {
  const navigate = useNavigate();
  const [ordersList, setOrdersList] = useState<KitchenOrder[]>(
    initialOrders
      .filter(o => ['new', 'in_progress', 'ready'].includes(o.status))
      .map(o => ({ ...o, priority: 'normal' as const }))
  );

  const advanceStatus = (orderId: string) => {
    setOrdersList(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      if (o.status === 'new') return { ...o, status: 'in_progress' as const };
      if (o.status === 'in_progress') return { ...o, status: 'ready' as const };
      return o;
    }));
  };

  const revertStatus = (orderId: string) => {
    setOrdersList(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      if (o.status === 'in_progress') return { ...o, status: 'new' as const };
      if (o.status === 'ready') return { ...o, status: 'in_progress' as const };
      return o;
    }));
  };

  const togglePriority = (orderId: string) => {
    setOrdersList(prev => prev.map(o =>
      o.id === orderId ? { ...o, priority: o.priority === 'normal' ? 'urgent' : 'normal' } : o
    ));
  };

  const timeAgo = (dateStr: string) => {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    return `${mins} min`;
  };

  const getColumnOrders = (status: string) =>
    ordersList
      .filter(o => o.status === status)
      .sort((a, b) => (a.priority === 'urgent' ? -1 : 0) - (b.priority === 'urgent' ? -1 : 0));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/staff')} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-xl flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-primary" />
            Kitchen
          </h1>
        </div>
        <div className="flex gap-2 text-sm">
          {columns.map(col => (
            <span key={col.status} className={cn('px-3 py-1 rounded-full font-semibold text-primary-foreground', col.headerBg)}>
              {getColumnOrders(col.status).length} {col.label.toLowerCase()}
            </span>
          ))}
        </div>
      </header>

      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {columns.map(col => {
          const colOrders = getColumnOrders(col.status);
          return (
            <div key={col.status} className={cn('rounded-2xl border-2 bg-muted/30 flex flex-col min-h-[300px]', col.borderColor)}>
              <div className={cn('px-4 py-3 rounded-t-xl flex items-center justify-between', col.headerBg)}>
                <div className="flex items-center gap-2 text-primary-foreground font-bold">
                  {col.icon}
                  <span>{col.label}</span>
                </div>
                <span className="w-7 h-7 rounded-full bg-background/20 flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {colOrders.length}
                </span>
              </div>

              <div className="p-3 space-y-3 flex-1">
                {colOrders.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
                    No orders
                  </div>
                )}
                {colOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      'rounded-xl bg-card border border-border shadow-sm overflow-hidden',
                      order.priority === 'urgent' && 'ring-2 ring-destructive'
                    )}
                  >
                    <div className="px-3 py-2 flex items-center justify-between border-b border-border">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground/40" />
                        <span className="font-heading font-bold text-foreground">Table #{order.tableNumber}</span>
                        {order.priority === 'urgent' && (
                          <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">{timeAgo(order.createdAt)}</span>
                      </div>
                    </div>

                    <div className="px-3 py-2 space-y-1.5">
                      {order.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-accent-foreground font-bold text-xs">
                            {item.quantity}
                          </span>
                          <span className="text-card-foreground">{item.menuItem.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="px-3 py-2 border-t border-border flex gap-2">
                      <button
                        onClick={() => togglePriority(order.id)}
                        className={cn(
                          'p-2 rounded-lg border transition-colors',
                          order.priority === 'urgent' ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border text-muted-foreground hover:bg-muted'
                        )}
                        title={order.priority === 'urgent' ? 'Remove priority' : 'Urgent'}
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>

                      {col.status !== 'new' && (
                        <button
                          onClick={() => revertStatus(order.id)}
                          className="px-3 py-2 rounded-lg border border-border text-muted-foreground text-xs font-medium hover:bg-muted transition-colors"
                        >
                          ← Back
                        </button>
                      )}

                      {col.status !== 'ready' && (
                        <button
                          onClick={() => advanceStatus(order.id)}
                          className={cn(
                            'flex-1 py-2 rounded-lg font-bold text-sm transition-opacity hover:opacity-90',
                            col.status === 'new' ? 'bg-primary text-primary-foreground' : 'bg-success text-success-foreground'
                          )}
                        >
                          {col.status === 'new' ? 'Start →' : 'Done ✓'}
                        </button>
                      )}

                      {col.status === 'ready' && (
                        <div className="flex-1 py-2 rounded-lg bg-success/10 text-center">
                          <span className="text-success font-bold text-sm">Awaiting Pickup</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KitchenDisplay;
