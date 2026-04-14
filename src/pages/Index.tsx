import { useNavigate } from 'react-router-dom';
import { Users, Utensils } from 'lucide-react';

const cards = [
  { icon: <Utensils className="w-7 h-7" />, label: 'Зона клієнта', desc: 'Меню, замовлення, бронювання', path: '/customer' },
  { icon: <Users className="w-7 h-7" />, label: 'Зона персоналу', desc: 'Управління залом, кухня, аналітика', path: '/staff' },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, hsl(1 76% 55%) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, hsl(1 76% 55%) 0%, transparent 65%)' }} />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(ellipse, hsl(1 76% 55%) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(1 76% 55%) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold tracking-tight mb-2">
          HoReCa <span className="text-primary">BOSS</span>
        </h1>
        <p className="text-muted-foreground text-lg">Оберіть зону для роботи</p>
      </div>

      <div className="w-full max-w-md grid grid-cols-2 gap-3">
        {cards.map(({ icon, label, desc, path }, i) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-white/40 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(229,57,53,0.12)] hover:border-primary/40 transition-all duration-300 cursor-pointer bg-primary-foreground animate-fade-in"
            
          >
            <div className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {icon}
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm text-foreground">{label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{desc}</div>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-12 text-xs text-muted-foreground">MVP Demo • HoReCa BOSS</p>
    </div>
  );
};

export default Index;
