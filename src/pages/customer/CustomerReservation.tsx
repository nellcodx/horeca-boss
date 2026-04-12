import { useState } from 'react';
import { CustomerLayout } from '@/components/layouts/CustomerLayout';
import { CalendarDays, Clock, Users, Send } from 'lucide-react';
import { toast } from 'sonner';

const CustomerReservation = () => {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Запит на бронювання відправлено! ✅');
    setForm({ name: '', phone: '', date: '', time: '', guests: '2' });
  };

  return (
    <CustomerLayout>
      <div className="px-4 pt-4">
        <h2 className="font-heading font-bold text-xl mb-4">Бронювання столика</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 rounded-xl bg-card border border-border space-y-4">
            <div>
              <label className="text-sm font-medium text-card-foreground block mb-1.5">Ім'я</label>
              <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none" placeholder="Ваше ім'я" />
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground block mb-1.5">Телефон</label>
              <input required type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none" placeholder="+380..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-1.5">Дата</label>
                <input required type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-1.5">Час</label>
                <input required type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground block mb-1.5">Кількість гостей</label>
              <input required type="number" min="1" max="20" value={form.guests} onChange={e => setForm(p => ({ ...p, guests: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Send className="w-5 h-5" />
            Забронювати
          </button>
        </form>
      </div>
    </CustomerLayout>
  );
};

export default CustomerReservation;
