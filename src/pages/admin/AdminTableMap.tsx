import { useState, useRef, useCallback, useMemo } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { tables as initialTables, orders, TableInfo } from '@/data/mock';
import { cn } from '@/lib/utils';
import {
  Users, Clock, CreditCard, Utensils, CalendarClock,
} from 'lucide-react';
import { TableVisual } from '@/components/TableVisual';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from '@/components/ui/tooltip';

const statusCfg = {
  free:     { label: 'Free',       bg: 'bg-success/10', border: 'border-success/30', text: 'text-success',      dot: 'bg-success',      icon: Utensils },
  occupied: { label: 'Occupied',   bg: 'bg-destructive/10', border: 'border-destructive/30', text: 'text-destructive', dot: 'bg-destructive', icon: Users },
  reserved: { label: 'Reserved',   bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning',     dot: 'bg-warning',      icon: CalendarClock },
  payment:  { label: 'Payment',    bg: 'bg-info/10',    border: 'border-info/30',    text: 'text-info',        dot: 'bg-info',         icon: CreditCard },
} as const;

const GRID = 20;
const snap = (v: number) => Math.round(v / GRID) * GRID;

const AdminTableMap = () => {
  const [tables, setTables] = useState<TableInfo[]>(initialTables);
  const [zone, setZone] = useState('all');
  const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const dragOffset = useRef({ dx: 0, dy: 0 });
  const floorRef = useRef<HTMLDivElement>(null);

  const zones = useMemo(() => ['all', ...Array.from(new Set(tables.map(t => t.zone)))], [tables]);
  const filtered = zone === 'all' ? tables : tables.filter(t => t.zone === zone);

  const handlePointerDown = useCallback((e: React.PointerEvent, table: TableInfo) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffset.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    setDragId(table.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragId || !floorRef.current) return;
    const parentRect = floorRef.current.getBoundingClientRect();
    const nx = snap(e.clientX - parentRect.left - dragOffset.current.dx);
    const ny = snap(e.clientY - parentRect.top - dragOffset.current.dy);
    setTables(prev => prev.map(t => t.id === dragId ? { ...t, x: Math.max(0, nx), y: Math.max(0, ny) } : t));
  }, [dragId]);

  const handlePointerUp = useCallback(() => setDragId(null), []);

  const cycleStatus = (table: TableInfo) => {
    const order: TableInfo['status'][] = ['free', 'occupied', 'payment', 'free'];
    if (table.status === 'reserved') return;
    const idx = order.indexOf(table.status);
    const next = order[(idx + 1) % order.length];
    setTables(prev => prev.map(t => t.id === table.id ? { ...t, status: next } : t));
  };

  const getOrder = (orderId?: string) => orderId ? orders.find(o => o.id === orderId) : undefined;

  const counts = useMemo(() => {
    const c = { free: 0, occupied: 0, reserved: 0, payment: 0 };
    filtered.forEach(t => c[t.status]++);
    return c;
  }, [filtered]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-[32px] font-bold text-foreground leading-tight">Floor Map</h1>
            <p className="text-sm text-muted-foreground mt-1">Drag tables · click for details</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(Object.keys(statusCfg) as Array<keyof typeof statusCfg>).map(s => (
              <div
                key={s}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border shadow-card',
                  statusCfg[s].bg, statusCfg[s].border, statusCfg[s].text
                )}
              >
                <div className={cn('w-2.5 h-2.5 rounded-full', statusCfg[s].dot)} />
                {statusCfg[s].label}: {counts[s]}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 bg-card p-1.5 rounded-xl w-fit shadow-card border border-border">
          {zones.map(z => (
            <button
              key={z}
              onClick={() => setZone(z)}
              className={cn(
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                zone === z
                  ? 'bg-primary text-primary-foreground shadow-card-hover'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              )}
            >
              {z === 'all' ? 'All' : z}
            </button>
          ))}
        </div>

        <div
          ref={floorRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative bg-card border border-border rounded-2xl overflow-hidden select-none shadow-card"
          style={{
            minHeight: 520,
            backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: `${GRID}px ${GRID}px`,
          }}
        >
          {filtered.map(table => {
            const cfg = statusCfg[table.status];
            const isDragging = dragId === table.id;

            return (
              <Tooltip key={table.id}>
                <TooltipTrigger asChild>
                  <div
                    onPointerDown={(e) => handlePointerDown(e, table)}
                    onClick={() => !isDragging && setSelectedTable(table)}
                    className={cn(
                      'absolute cursor-grab active:cursor-grabbing transition-all duration-200',
                      isDragging ? 'z-30 scale-110 shadow-card-hover' : 'z-10 hover:scale-105 shadow-card hover:shadow-card-hover',
                    )}
                    style={{
                      left: table.x,
                      top: table.y,
                      touchAction: 'none',
                    }}
                  >
                    <TableVisual
                      seats={table.seats}
                      shape={table.shape}
                      status={table.status}
                      number={table.number}
                    />
                    {table.reservationTime && (
                      <div className="absolute -top-1.5 -right-1.5 bg-warning text-warning-foreground rounded-full w-5 h-5 flex items-center justify-center z-20 shadow-card">
                        <Clock className="w-3 h-3" />
                      </div>
                    )}
                    {table.status === 'payment' && (
                      <div className="absolute -top-1.5 -left-1.5 bg-info text-info-foreground rounded-full w-5 h-5 flex items-center justify-center z-20 shadow-card animate-pulse">
                        <CreditCard className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs shadow-card-hover">
                  <p className="font-semibold">Table #{table.number} — {cfg.label}</p>
                  {table.waiter && <p>Waiter: {table.waiter}</p>}
                  {table.reservationGuest && <p>Reservation: {table.reservationGuest} at {table.reservationTime}</p>}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <Dialog open={!!selectedTable} onOpenChange={(o) => !o && setSelectedTable(null)}>
          {selectedTable && (() => {
            const cfg = statusCfg[selectedTable.status];
            const order = getOrder(selectedTable.orderId);
            return (
              <DialogContent className="max-w-md shadow-modal rounded-2xl">
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center border-2 text-xl font-heading font-bold',
                      cfg.bg, cfg.border, cfg.text
                    )}>
                      {selectedTable.number}
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-heading">Table #{selectedTable.number}</DialogTitle>
                      <DialogDescription className="flex items-center gap-2 mt-1">
                        <Badge className={cn('text-xs font-semibold', cfg.text, cfg.bg, cfg.border, 'border')}>
                          {cfg.label}
                        </Badge>
                        <span className="text-muted-foreground">{selectedTable.seats} seats · {selectedTable.zone}</span>
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  {selectedTable.waiter && (
                    <div className="flex items-center gap-3 text-sm bg-accent rounded-xl px-4 py-3">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Waiter:</span>
                      <span className="font-semibold text-foreground">{selectedTable.waiter}</span>
                    </div>
                  )}

                  {selectedTable.reservationGuest && (
                    <div className="bg-warning/10 border border-warning/25 rounded-xl p-4 space-y-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-warning">
                        <CalendarClock className="w-4 h-4" /> Reservation
                      </div>
                      <p className="text-sm text-foreground">{selectedTable.reservationGuest} · {selectedTable.reservationTime}</p>
                    </div>
                  )}

                  {order && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">Order</h4>
                      <div className="bg-accent rounded-xl divide-y divide-border overflow-hidden">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-foreground">{item.menuItem.name} <span className="text-muted-foreground">×{item.quantity}</span></span>
                            <span className="font-semibold text-foreground">€{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-1 px-1">
                        <span className="text-sm font-medium text-muted-foreground">Total</span>
                        <span className="text-2xl font-heading font-bold text-foreground">€{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    {selectedTable.status !== 'reserved' && (
                      <button
                        onClick={() => { cycleStatus(selectedTable); setSelectedTable(null); }}
                        className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold hover:bg-primary-hover transition-colors duration-200 shadow-card hover:shadow-card-hover"
                      >
                        {selectedTable.status === 'free' ? 'Seat Guests' :
                         selectedTable.status === 'occupied' ? 'Proceed to Payment' : 'Free Table'}
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedTable(null)}
                      className="px-5 py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogContent>
            );
          })()}
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminTableMap;
