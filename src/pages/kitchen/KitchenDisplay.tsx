import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChefHat, Clock, CheckCircle2, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { orders as initialOrders, Order } from '@/data/mock';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface KitchenOrder extends Order {
  priority: 'normal' | 'urgent';
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'НОВЕ', color: 'text-warning-foreground', bg: 'bg-warning' },
  in_progress: { label: 'ГОТУЄТЬСЯ', color: 'text-primary-foreground', bg: 'bg-primary' },
  ready: { label: 'ГОТОВО', color: 'text-success-foreground', bg: 'bg-success' },
};

const KitchenDisplay = () => {
  const navigate = useNavigate();
  const [ordersList, setOrdersList] = useState<KitchenOrder[]>(
    initialOrders
      .filter(o => ['new', 'in_progress', 'ready'].includes(o.status))
      .map(o => ({ ...o, priority: 'normal' as const }))
  );
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const advanceStatus = (orderId: string) => {
    setOrdersList(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      if (o.status === 'new') return { ...o, status: 'in_progress' };
      if (o.status === 'in_progress') return { ...o, status: 'ready' };
      return o;
    }));
  };

  const togglePriority = (orderId: string) => {
    setOrdersList(prev => prev.map(o =>
      o.id === orderId ? { ...o, priority: o.priority === 'normal' ? 'urgent' : 'normal' } : o
    ));
  };

  const moveOrder = (orderId: string, direction: 'up' | 'down') => {
    setOrdersList(prev => {
      const idx = prev.findIndex(o => o.id === orderId);
      if (idx === -1) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const newList = [...prev];
      [newList[idx], newList[newIdx]] = [newList[newIdx], newList[idx]];
      return newList;
    });
  };

  const timeAgo = (dateStr: string) => {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    return `${mins} хв`;
  };

  const sorted = [...ordersList].sort((a, b) => {
    // Urgent first
    if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
    if (b.priority === 'urgent' && a.priority !== 'urgent') return 1;
    // Then by status
    const statusPriority = { new: 0, in_progress: 1, ready: 2 };
    return (statusPriority[a.status as keyof typeof statusPriority] || 3) - (statusPriority[b.status as keyof typeof statusPriority] || 3);
  });

  const filtered = filterStatus === 'all' ? sorted : sorted.filter(o => o.status === filterStatus);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/staff')} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-xl flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-primary" />
            Кухня
          </h1>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="px-3 py-1 rounded-full bg-warning text-warning-foreground font-semibold">
            {ordersList.filter(o => o.status === 'new').length} нових
          </span>
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
            {ordersList.filter(o => o.status === 'in_progress').length} в роботі
          </span>
          <span className="px-3 py-1 rounded-full bg-success text-success-foreground font-semibold">
            {ordersList.filter(o => o.status === 'ready').length} готово
          </span>
        </div>
      </header>

      {/* Filter tabs */}
      <div className="px-4 pt-4 flex gap-2">
        {[
          { id: 'all', label: 'Всі' },
          { id: 'new', label: 'Нові' },
          { id: 'in_progress', label: 'Готуються' },
          { id: 'ready', label: 'Готові' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilterStatus(f.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-semibold transition-colors border',
              filterStatus === f.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((order, i) => {
          const cfg = statusConfig[order.status] || statusConfig.new;
          return (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                'rounded-2xl border-2 overflow-hidden transition-all',
                order.priority === 'urgent' && 'ring-2 ring-destructive ring-offset-2 ring-offset-background',
                order.status === 'new' ? 'border-warning' : order.status === 'in_progress' ? 'border-primary' : 'border-success'
              )}
            >
              <div className={cn('px-4 py-3 flex items-center justify-between', cfg.bg)}>
                <div className="flex items-center gap-2">
                  <span className={cn('font-bold text-lg', cfg.color)}>Стіл #{order.tableNumber}</span>
                  {order.priority === 'urgent' && (
                    <AlertTriangle className={cn('w-5 h-5 animate-pulse', cfg.color)} />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={cn('w-4 h-4', cfg.color)} />
                  <span className={cn('text-sm font-semibold', cfg.color)}>{timeAgo(order.createdAt)}</span>
                </div>
              </div>

              {/* Stage indicator */}
              <div className="px-4 py-2 bg-muted/50 flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1">
                  {['Прийнято', 'Готується', 'Готово'].map((stage, idx) => {
                    const stageMap = { 0: 'new', 1: 'in_progress', 2: 'ready' };
                    const currentIdx = Object.values(stageMap).indexOf(order.status);
                    return (
                      <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                        <div className={cn(
                          'w-full h-1.5 rounded-full transition-colors',
                          idx <= currentIdx ? (idx === currentIdx ? 'bg-primary' : 'bg-success') : 'bg-border'
                        )} />
                        <span className="text-[10px] text-muted-foreground">{stage}</span>
                      </div>
                    );
                  })}
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

              {/* Actions */}
              <div className="p-3 bg-card border-t border-border flex gap-2">
                {order.status !== 'ready' ? (
                  <>
                    <button
                      onClick={() => togglePriority(order.id)}
                      className={cn(
                        'p-3 rounded-xl border transition-colors',
                        order.priority === 'urgent' ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border text-muted-foreground hover:bg-muted'
                      )}
                      title={order.priority === 'urgent' ? 'Зняти пріоритет' : 'Терміново'}
                    >
                      <AlertTriangle className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveOrder(order.id, 'up')} className="p-1 rounded border border-border text-muted-foreground hover:bg-muted">
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => moveOrder(order.id, 'down')} className="p-1 rounded border border-border text-muted-foreground hover:bg-muted">
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => advanceStatus(order.id)}
                      className={cn(
                        'flex-1 py-3 rounded-xl font-bold text-lg transition-opacity hover:opacity-90',
                        order.status === 'new' ? 'bg-primary text-primary-foreground' : 'bg-success text-success-foreground'
                      )}
                    >
                      {order.status === 'new' ? 'Почати готувати' : 'Готово ✓'}
                    </button>
                  </>
                ) : (
                  <div className="w-full p-3 bg-success/10 text-center rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-success mx-auto mb-1" />
                    <span className="font-bold text-success text-sm">Чекає на видачу</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default KitchenDisplay;
