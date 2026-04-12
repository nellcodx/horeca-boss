import { AdminLayout } from '@/components/layouts/AdminLayout';
import { TrendingUp, ShoppingBag, DollarSign, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const stats = [
  { label: 'Замовлень сьогодні', value: '47', icon: ShoppingBag, change: '+12%' },
  { label: 'Виручка', value: '28,450 ₴', icon: DollarSign, change: '+8%' },
  { label: 'Гостей', value: '124', icon: Users, change: '+15%' },
  { label: 'Сер. час обслуг.', value: '23 хв', icon: Clock, change: '-5%' },
];

const revenueData = [
  { day: 'Пн', revenue: 18200 },
  { day: 'Вт', revenue: 22100 },
  { day: 'Ср', revenue: 19800 },
  { day: 'Чт', revenue: 24500 },
  { day: 'Пт', revenue: 31200 },
  { day: 'Сб', revenue: 38400 },
  { day: 'Нд', revenue: 28450 },
];

const ordersData = [
  { hour: '10', orders: 5 },
  { hour: '11', orders: 8 },
  { hour: '12', orders: 15 },
  { hour: '13', orders: 22 },
  { hour: '14', orders: 18 },
  { hour: '15', orders: 10 },
  { hour: '16', orders: 7 },
  { hour: '17', orders: 12 },
  { hour: '18', orders: 25 },
  { hour: '19', orders: 32 },
  { hour: '20', orders: 28 },
  { hour: '21', orders: 20 },
  { hour: '22', orders: 12 },
];

const categoryData = [
  { name: 'Основні', value: 35, color: 'hsl(0, 78%, 52%)' },
  { name: 'Піца', value: 25, color: 'hsl(0, 78%, 65%)' },
  { name: 'Салати', value: 15, color: 'hsl(0, 78%, 78%)' },
  { name: 'Напої', value: 15, color: 'hsl(0, 40%, 85%)' },
  { name: 'Десерти', value: 10, color: 'hsl(0, 20%, 90%)' },
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

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Revenue chart */}
          <div className="rounded-xl bg-card border border-border p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Виручка за тиждень</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(0, 0%, 40%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0, 0%, 40%)" tickFormatter={v => `${(v / 1000).toFixed(0)}к`} />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} ₴`, 'Виручка']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(0, 0%, 90%)', fontSize: '13px' }}
                />
                <Bar dataKey="revenue" fill="hsl(0, 78%, 52%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Orders by hour */}
          <div className="rounded-xl bg-card border border-border p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Замовлення по годинах</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="hsl(0, 0%, 40%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0, 0%, 40%)" />
                <Tooltip
                  formatter={(value: number) => [value, 'Замовлень']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(0, 0%, 90%)', fontSize: '13px' }}
                />
                <Line type="monotone" dataKey="orders" stroke="hsl(0, 78%, 52%)" strokeWidth={2.5} dot={{ fill: 'hsl(0, 78%, 52%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Pie chart */}
          <div className="rounded-xl bg-card border border-border p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Популярні категорії</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Частка']} contentStyle={{ borderRadius: '8px', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent orders table */}
          <div className="rounded-xl bg-card border border-border overflow-hidden lg:col-span-2">
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
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
