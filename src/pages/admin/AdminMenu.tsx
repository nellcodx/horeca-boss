import { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { menuItems as initialItems, menuCategories, MenuItem } from '@/data/mock';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminMenu = () => {
  const [items] = useState<MenuItem[]>(initialItems);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = items.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || i.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-2xl">Menu Management</h2>
            <p className="text-muted-foreground text-sm">{items.length} items</p>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Add Dish
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <button onClick={() => setActiveCategory('all')} className={cn('px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors', activeCategory === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground')}>
              All
            </button>
            {menuCategories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={cn('px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors', activeCategory === cat.id ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground')}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-sm text-card-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.nameEn}</div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">
                    {menuCategories.find(c => c.id === item.category)?.name}
                  </td>
                  <td className="p-4 text-sm font-semibold text-card-foreground">€{item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', item.available ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive')}>
                      {item.available ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMenu;
