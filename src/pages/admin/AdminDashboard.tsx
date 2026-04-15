import { AdminLayout } from '@/components/layouts/AdminLayout';
import { TrendingUp, ShoppingBag, DollarSign, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const stats = [
  { label: 'Orders today', value: '47', icon: ShoppingBag, change: '+12%' },
  { label: 'Revenue', value: '€690', icon: DollarSign, change: '+8%' },
  { label: 'Guests', value: '124', icon: Users, change: '+15%' },
  { label: 'Avg. service time', value: '23 min', icon: Clock, change: '-5%' },
];

const revenueData = [
  { day: 'Mon', revenue: 440 },
  { day: 'Tue', revenue: 535 },
  { day: 'Wed', revenue: 480 },
  { day: 'Thu', revenue: 595 },
  { day: 'Fri', revenue: 755 },
  { day: 'Sat', revenue: 930 },
  { day: 'Sun', revenue: 690 },
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
  { name: 'Mains', value: 35, color: 'hsl(0, 78%, 52%)' },
  { name: 'Pizza', value: 25, color: 'hsl(0, 78%, 65%)' },
  { name: 'Salads', value: 15, color: 'hsl(0, 78%, 78%)' },
  { name: 'Drinks', value: 15, color: 'hsl(0, 40%, 85%)' },
  { name: 'Desserts', value: 10, color: 'hsl(0, 20%, 90%)' },
];

const recentOrders = [
  { id: '#1247', table: 5, total: '€30.15', status: 'Preparing', time: '5 min ago' },
  { id: '#1246', table: 2, total: '€16.50', status: 'Served', time: '12 min ago' },
  { id: '#1245', table: 8, total: '€51.60', status: 'Paid', time: '25 min ago' },
  { id: '#1244', table: 3, total: '€10.30', status: 'New', time: '2 min ago' },
  { id: '#1243', table: 1, total: '€21.55', status: 'Ready', time: '18 min ago' },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-heading font-bold text-2xl">Dashboard</h2>
          <p className="text-muted-foreground text-sm">Venue activity overview</p>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl bg-card border border-border p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Weekly Revenue</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(0, 0%, 40%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0, 0%, 40%)" tickFormatter={v => `€${v}`} />
                <Tooltip
                  formatter={(value: number) => [`€${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(0, 0%, 90%)', fontSize: '13px' }}
                />
                <Bar dataKey="revenue" fill="hsl(0, 78%, 52%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl bg-card border border-border p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Orders by Hour</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="hsl(0, 0%, 40%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0, 0%, 40%)" />
                <Tooltip
                  formatter={(value: number) => [value, 'Orders']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(0, 0%, 90%)', fontSize: '13px' }}
                />
                <Line type="monotone" dataKey="orders" stroke="hsl(0, 78%, 52%)" strokeWidth={2.5} dot={{ fill: 'hsl(0, 78%, 52%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-xl bg-card border border-border p-5">
            <h3 className="font-heading font-semibold text-lg mb-4">Popular Categories</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} contentStyle={{ borderRadius: '8px', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl bg-card border border-border overflow-hidden lg:col-span-2">
            <div className="p-5 border-b border-border">
              <h3 className="font-heading font-semibold text-lg">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Table</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time</th>
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
