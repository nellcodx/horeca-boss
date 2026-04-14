import { useState } from 'react';
import { WaiterLayout } from '@/components/layouts/WaiterLayout';
import { tables as initialTables, TableInfo } from '@/data/mock';
import { cn } from '@/lib/utils';
import { TableVisual } from '@/components/TableVisual';

const statusConfig: Record<TableInfo['status'], { label: string; dot: string }> = {
  free: { label: 'Вільний', dot: 'bg-success' },
  occupied: { label: 'Зайнятий', dot: 'bg-destructive' },
  reserved: { label: 'Заброньований', dot: 'bg-warning' },
  payment: { label: 'Оплата', dot: 'bg-info' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(table => (
            <button
              key={table.id}
              onClick={() => handleTableTap(table)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/50 bg-card/50 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]',
                table.status === 'reserved' && 'opacity-60 cursor-not-allowed'
              )}
              disabled={table.status === 'reserved'}
            >
              <TableVisual
                seats={table.seats}
                shape={table.shape}
                status={table.status}
                number={table.number}
              />
              <span className="text-xs font-medium text-muted-foreground">{statusConfig[table.status].label} · {table.seats} місць</span>
            </button>
          ))}
        </div>
      </div>
    </WaiterLayout>
  );
};

export default WaiterFloor;
