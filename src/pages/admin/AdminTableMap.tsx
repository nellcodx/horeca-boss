import { useState, useRef, useCallback, useMemo } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { tables as initialTables, orders, TableInfo } from '@/data/mock';
import { cn } from '@/lib/utils';
import {
  Users, Clock, CreditCard, Utensils, CalendarClock, X, GripVertical,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from '@/components/ui/tooltip';

/* ── Status config ── */
const statusCfg = {
  free:     { label: 'Вільний',       color: 'bg-success/10 border-success/40', text: 'text-success',  dot: 'bg-success',  icon: Utensils },
  occupied: { label: 'Зайнятий',      color: 'bg-destructive/10 border-destructive/40', text: 'text-destructive', dot: 'bg-destructive', icon: Users },
  reserved: { label: 'Заброньований', color: 'bg-warning/10 border-warning/40', text: 'text-warning', dot: 'bg-warning', icon: CalendarClock },
  payment:  { label: 'Оплата',        color: 'bg-info/10 border-info/40',       text: 'text-info',    dot: 'bg-info',    icon: CreditCard },
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

  /* ── Drag handlers ── */
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

  /* ── Status change ── */
  const cycleStatus = (table: TableInfo) => {
    const order: TableInfo['status'][] = ['free', 'occupied', 'payment', 'free'];
    if (table.status === 'reserved') return;
    const idx = order.indexOf(table.status);
    const next = order[(idx + 1) % order.length];
    setTables(prev => prev.map(t => t.id === table.id ? { ...t, status: next } : t));
  };

  /* ── Order lookup ── */
  const getOrder = (orderId?: string) => orderId ? orders.find(o => o.id === orderId) : undefined;

  /* ── Summary counts ── */
  const counts = useMemo(() => {
    const c = { free: 0, occupied: 0, reserved: 0, payment: 0 };
    filtered.forEach(t => c[t.status]++);
    return c;
  }, [filtered]);

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Карта залу</h1>
            <p className="text-sm text-muted-foreground">Перетягуйте столи для розташування</p>
          </div>

          {/* Summary pills */}
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(statusCfg) as Array<keyof typeof statusCfg>).map(s => (
              <div key={s} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border', statusCfg[s].color, statusCfg[s].text)}>
                <div className={cn('w-2 h-2 rounded-full', statusCfg[s].dot)} />
                {statusCfg[s].label}: {counts[s]}
              </div>
            ))}
          </div>
        </div>

        {/* Zone filter */}
        <div className="flex gap-2 bg-muted/50 p-1 rounded-xl w-fit">
          {zones.map(z => (
            <button
              key={z}
              onClick={() => setZone(z)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                zone === z
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {z === 'all' ? 'Всі' : z}
            </button>
          ))}
        </div>

        {/* Floor plan */}
        <div
          ref={floorRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative bg-muted/30 border border-border rounded-2xl overflow-hidden select-none"
          style={{
            minHeight: 500,
            backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: `${GRID}px ${GRID}px`,
          }}
        >
          {filtered.map(table => {
            const cfg = statusCfg[table.status];
            const Icon = cfg.icon;
            const isDragging = dragId === table.id;
            const isCircle = table.shape === 'circle';
            const size = table.seats >= 6 ? 120 : table.seats >= 4 ? 100 : 80;

            return (
              <Tooltip key={table.id}>
                <TooltipTrigger asChild>
                  <div
                    onPointerDown={(e) => handlePointerDown(e, table)}
                    onClick={() => !isDragging && setSelectedTable(table)}
                    className={cn(
                      'absolute flex flex-col items-center justify-center gap-1 border-2 cursor-grab active:cursor-grabbing transition-shadow duration-200',
                      cfg.color,
                      isCircle ? 'rounded-full' : 'rounded-xl',
                      isDragging ? 'z-30 shadow-xl scale-105 ring-2 ring-primary/30' : 'z-10 hover:shadow-lg hover:scale-[1.03]',
                      table.status === 'payment' && 'animate-pulse'
                    )}
                    style={{
                      left: table.x,
                      top: table.y,
                      width: size,
                      height: size,
                      touchAction: 'none',
                    }}
                  >
                    <GripVertical className="w-3 h-3 text-muted-foreground/40 absolute top-1 right-1" />
                    <span className="font-heading font-bold text-lg text-foreground leading-none">
                      {table.number}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon className={cn('w-3.5 h-3.5', cfg.text)} />
                      <span className={cn('text-[10px] font-semibold', cfg.text)}>{cfg.label}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{table.seats} місць</span>
                    {table.reservationTime && (
                      <div className="absolute -top-2 -right-2 bg-warning text-warning-foreground rounded-full w-5 h-5 flex items-center justify-center">
                        <Clock className="w-3 h-3" />
                      </div>
                    )}
                    {table.status === 'payment' && (
                      <div className="absolute -top-2 -left-2 bg-info text-info-foreground rounded-full w-5 h-5 flex items-center justify-center">
                        <CreditCard className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  <p className="font-semibold">Стіл #{table.number} — {cfg.label}</p>
                  {table.waiter && <p>Офіціант: {table.waiter}</p>}
                  {table.reservationGuest && <p>Бронь: {table.reservationGuest} о {table.reservationTime}</p>}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Detail modal */}
        <Dialog open={!!selectedTable} onOpenChange={(o) => !o && setSelectedTable(null)}>
          {selectedTable && (() => {
            const cfg = statusCfg[selectedTable.status];
            const order = getOrder(selectedTable.orderId);
            return (
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center border-2 text-xl font-heading font-bold', cfg.color)}>
                      {selectedTable.number}
                    </div>
                    <div>
                      <DialogTitle className="text-lg">Стіл #{selectedTable.number}</DialogTitle>
                      <DialogDescription className="flex items-center gap-2 mt-0.5">
                        <Badge className={cn('text-xs', cfg.text, cfg.color, 'border')}>
                          {cfg.label}
                        </Badge>
                        <span>{selectedTable.seats} місць · {selectedTable.zone}</span>
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                  {/* Waiter */}
                  {selectedTable.waiter && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Офіціант:</span>
                      <span className="font-medium">{selectedTable.waiter}</span>
                    </div>
                  )}

                  {/* Reservation */}
                  {selectedTable.reservationGuest && (
                    <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium text-warning">
                        <CalendarClock className="w-4 h-4" /> Бронювання
                      </div>
                      <p className="text-sm">{selectedTable.reservationGuest} · {selectedTable.reservationTime}</p>
                    </div>
                  )}

                  {/* Order items */}
                  {order && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Замовлення</h4>
                      <div className="bg-muted/50 rounded-lg divide-y divide-border">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-3 py-2 text-sm">
                            <span>{item.menuItem.name} <span className="text-muted-foreground">×{item.quantity}</span></span>
                            <span className="font-medium">{item.menuItem.price * item.quantity} ₴</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-1 px-1">
                        <span className="text-sm font-medium text-muted-foreground">Разом</span>
                        <span className="text-lg font-heading font-bold text-foreground">{order.total} ₴</span>
                      </div>
                    </div>
                  )}

                  {/* Quick actions */}
                  <div className="flex gap-2 pt-2">
                    {selectedTable.status !== 'reserved' && (
                      <button
                        onClick={() => { cycleStatus(selectedTable); setSelectedTable(null); }}
                        className="flex-1 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
                      >
                        {selectedTable.status === 'free' ? 'Посадити гостей' :
                         selectedTable.status === 'occupied' ? 'Перейти до оплати' : 'Звільнити стіл'}
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedTable(null)}
                      className="px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                    >
                      Закрити
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
