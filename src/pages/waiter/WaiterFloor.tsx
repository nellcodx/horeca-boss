import { useState } from 'react';
import { WaiterLayout } from '@/components/layouts/WaiterLayout';
import { tables as initialTables, TableInfo } from '@/data/mock';
import { cn } from '@/lib/utils';
import { Users, Clock, CreditCard } from 'lucide-react';

const statusConfig: Record<TableInfo['status'], { label: string; color: string; dot: string }> = {
  free: { label: 'Вільний', color: 'border-success/50 bg-success/5', dot: 'bg-success' },
  occupied: { label: 'Зайнятий', color: 'border-primary/50 bg-primary/5', dot: 'bg-primary' },
  reserved: { label: 'Заброньований', color: 'border-warning/50 bg-warning/5', dot: 'bg-warning' },
  payment: { label: 'Оплата', color: 'border-info/50 bg-info/5', dot: 'bg-info' },
};

const WaiterFloor = () => {
  const [tables, setTables] = useState<TableInfo[]>(initialTables);
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const zones = ['all', ...Array.from(new Set(tables.map(t => t.zone)))];

  const filtered = selectedZone === 'all' ? tables : tables.filter(t => t.zone === selectedZone);

  const handleTableTap = (table: TableInfo) => {
    setTables(prev => prev.map(t => {
      if (t.id !== table.id) return t;
      const next: TableInfo['status'] = t.status === 'free' ? 'occupied' : t.status === 'occupied' ? 'payment' : t.status === 'payment' ? 'free' : t.status;
      return { ...t, status: next };
    }));
  };

  return (
    <WaiterLayout>
      <div className="space-y-4">
        <div className="flex gap-2">
          {zones.map(z => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={cn(
                'px-5 py-3 rounded-xl text-base font-semibold transition-colors border',
                selectedZone === z ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground'
              )}
            >
              {z === 'all' ? 'Всі' : z}
            </button>
          ))}
        </div>

        <div className="flex gap-4 text-sm">
          {Object.entries(statusConfig).map(([key, { label, dot }]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={cn('w-3 h-3 rounded-full', dot)} />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(table => {
            const cfg = statusConfig[table.status];
            return (
              <button
                key={table.id}
                onClick={() => handleTableTap(table)}
                className={cn(
                  'p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg flex flex-col items-center gap-3',
                  cfg.color,
                  table.status === 'reserved' && 'opacity-60 cursor-not-allowed'
                )}
                disabled={table.status === 'reserved'}
              >
                <div className="text-3xl font-heading font-bold text-foreground">#{table.number}</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{table.seats} місць</span>
                </div>
                <div className={cn('w-3 h-3 rounded-full', cfg.dot)} />
                <span className="text-xs font-medium text-muted-foreground">{cfg.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </WaiterLayout>
  );
};

export default WaiterFloor;
