import { cn } from '@/lib/utils';

interface TableVisualProps {
  seats: number;
  shape: 'rect' | 'circle';
  status: 'free' | 'occupied' | 'reserved' | 'payment';
  number: number;
  size?: number;
  className?: string;
}

const statusColors = {
  free:     { table: 'bg-success/15 border-success/50',  chair: 'bg-success/25 border-success/40',  text: 'text-success' },
  occupied: { table: 'bg-destructive/15 border-destructive/50', chair: 'bg-destructive/25 border-destructive/40', text: 'text-destructive' },
  reserved: { table: 'bg-warning/15 border-warning/50',  chair: 'bg-warning/25 border-warning/40',  text: 'text-warning' },
  payment:  { table: 'bg-info/15 border-info/50',        chair: 'bg-info/25 border-info/40',        text: 'text-info' },
};

/* Chair positions around a rectangle (top, right, bottom, left) */
const getChairPositions = (seats: number, tableW: number, tableH: number) => {
  const chairs: { x: number; y: number; rotation: number }[] = [];
  const chairSize = 14;
  const gap = 4;

  if (seats <= 2) {
    // 2 chairs: left and right
    chairs.push({ x: -chairSize - gap, y: tableH / 2 - chairSize / 2, rotation: 0 });
    chairs.push({ x: tableW + gap, y: tableH / 2 - chairSize / 2, rotation: 0 });
  } else if (seats <= 4) {
    // 4 chairs: one per side
    chairs.push({ x: tableW / 2 - chairSize / 2, y: -chairSize - gap, rotation: 0 });
    chairs.push({ x: tableW + gap, y: tableH / 2 - chairSize / 2, rotation: 0 });
    chairs.push({ x: tableW / 2 - chairSize / 2, y: tableH + gap, rotation: 0 });
    chairs.push({ x: -chairSize - gap, y: tableH / 2 - chairSize / 2, rotation: 0 });
  } else if (seats <= 6) {
    // 6 chairs: 2 top, 1 right, 2 bottom, 1 left
    const spacing = tableW / 3;
    chairs.push({ x: spacing - chairSize / 2, y: -chairSize - gap, rotation: 0 });
    chairs.push({ x: spacing * 2 - chairSize / 2, y: -chairSize - gap, rotation: 0 });
    chairs.push({ x: tableW + gap, y: tableH / 2 - chairSize / 2, rotation: 0 });
    chairs.push({ x: spacing - chairSize / 2, y: tableH + gap, rotation: 0 });
    chairs.push({ x: spacing * 2 - chairSize / 2, y: tableH + gap, rotation: 0 });
    chairs.push({ x: -chairSize - gap, y: tableH / 2 - chairSize / 2, rotation: 0 });
  } else {
    // 8 chairs: 2 per side
    const hSpacing = tableW / 3;
    const vSpacing = tableH / 3;
    chairs.push({ x: hSpacing - chairSize / 2, y: -chairSize - gap, rotation: 0 });
    chairs.push({ x: hSpacing * 2 - chairSize / 2, y: -chairSize - gap, rotation: 0 });
    chairs.push({ x: tableW + gap, y: vSpacing - chairSize / 2, rotation: 0 });
    chairs.push({ x: tableW + gap, y: vSpacing * 2 - chairSize / 2, rotation: 0 });
    chairs.push({ x: hSpacing - chairSize / 2, y: tableH + gap, rotation: 0 });
    chairs.push({ x: hSpacing * 2 - chairSize / 2, y: tableH + gap, rotation: 0 });
    chairs.push({ x: -chairSize - gap, y: vSpacing - chairSize / 2, rotation: 0 });
    chairs.push({ x: -chairSize - gap, y: vSpacing * 2 - chairSize / 2, rotation: 0 });
  }

  return chairs.slice(0, seats);
};

const getCircleChairPositions = (seats: number, radius: number) => {
  const chairs: { x: number; y: number; rotation: number }[] = [];
  const chairSize = 14;
  const gap = 6;
  const dist = radius + chairSize / 2 + gap;

  for (let i = 0; i < seats; i++) {
    const angle = (i / seats) * Math.PI * 2 - Math.PI / 2;
    chairs.push({
      x: radius + Math.cos(angle) * dist - chairSize / 2,
      y: radius + Math.sin(angle) * dist - chairSize / 2,
      rotation: (angle * 180) / Math.PI + 90,
    });
  }
  return chairs;
};

export const TableVisual = ({ seats, shape, status, number, size: sizeProp, className }: TableVisualProps) => {
  const colors = statusColors[status];
  const chairSize = 14;

  if (shape === 'circle') {
    const radius = (sizeProp ?? (seats >= 6 ? 40 : 30));
    const diameter = radius * 2;
    const chairs = getCircleChairPositions(seats, radius);
    const totalSize = diameter + (chairSize + 8) * 2;

    return (
      <div className={cn('relative', className)} style={{ width: totalSize, height: totalSize }}>
        {/* Chairs */}
        {chairs.map((c, i) => (
          <div
            key={i}
            className={cn('absolute rounded-sm border', colors.chair)}
            style={{
              width: chairSize,
              height: chairSize,
              left: c.x + chairSize + 4,
              top: c.y + chairSize + 4,
              borderRadius: 4,
            }}
          />
        ))}
        {/* Table surface */}
        <div
          className={cn('absolute rounded-full border-2 flex items-center justify-center', colors.table)}
          style={{
            width: diameter,
            height: diameter,
            left: chairSize + 4 + 4,
            top: chairSize + 4 + 4,
          }}
        >
          <span className={cn('font-heading font-bold text-sm', colors.text)}>{number}</span>
        </div>
      </div>
    );
  }

  // Rectangle
  const tableW = sizeProp ?? (seats >= 6 ? 90 : seats >= 4 ? 72 : 56);
  const tableH = sizeProp ? sizeProp * 0.65 : (seats >= 6 ? 56 : seats >= 4 ? 48 : 40);
  const chairs = getChairPositions(seats, tableW, tableH);
  const pad = chairSize + 8;

  return (
    <div className={cn('relative', className)} style={{ width: tableW + pad * 2, height: tableH + pad * 2 }}>
      {/* Chairs */}
      {chairs.map((c, i) => (
        <div
          key={i}
          className={cn('absolute border', colors.chair)}
          style={{
            width: chairSize,
            height: chairSize,
            left: c.x + pad,
            top: c.y + pad,
            borderRadius: 4,
          }}
        />
      ))}
      {/* Table surface */}
      <div
        className={cn('absolute rounded-lg border-2 flex items-center justify-center', colors.table)}
        style={{
          width: tableW,
          height: tableH,
          left: pad,
          top: pad,
        }}
      >
        <span className={cn('font-heading font-bold text-sm', colors.text)}>{number}</span>
      </div>
    </div>
  );
};
