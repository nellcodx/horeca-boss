import { AdminLayout } from '@/components/layouts/AdminLayout';
import { TrendingUp, ShoppingBag, DollarSign, Users, Clock } from 'lucide-react';

const stats = [
  { label: 'Замовлень сьогодні', value: '47', icon: ShoppingBag, change: '+12%' },
  { label: 'Виручка', value: '28,450 ₴', icon: DollarSign, change: '+8%' },
  { label: 'Гостей', value: '124', icon: Users, change: '+15%' },
  { label: 'Сер. час обслуг.', value: '23 хв', icon: Clock, change: '-5%' },
];

const recentOrders = [
  { id: '#1247', table: 5, total: '1,245 ₴', status: 'Готується', time: '5 хв тому' },
  { id: '#1246', table: 2, total: '685 ₴', status: 'Подано', time: '12 хв тому' },
  { id: '#1245', table: 8, total: '2,130 ₴', status: 'Оплачено', time: '25 хв тому' },
  { id: '#1244', table: 3, total: '425 ₴', status: 'Нове', time: '2 хв тому' },
  { id: '#1243', table: 1, total: '890 ₴', status: 'Готово', time: '18 хв тому' },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-heading font-bold text-2xl">Дашборд</h2>
          <p className="text-muted-foreground text-sm">Огляд діяльності закладу</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, change }) => (
            <div key={label} className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />{change}
                </span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Recent orders table */}
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-heading font-semibold text-lg">Останні замовлення</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Стіл</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Сума</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Статус</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Час</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-card-foreground">{order.id}</td>
                    <td className="p-4 text-sm text-card-foreground">#{order.table}</td>
                    <td className="p-4 text-sm font-semibold text-card-foreground">{order.total}</td>
                    <td className="p-4 text-sm">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
