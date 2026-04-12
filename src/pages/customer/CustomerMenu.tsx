import { useState } from 'react';
import { CustomerLayout } from '@/components/layouts/CustomerLayout';
import { menuCategories, menuItems } from '@/data/mock';
import { useCart } from '@/contexts/CartContext';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CustomerMenu = () => {
  const [activeCategory, setActiveCategory] = useState('salads');
  const { items: cartItems, addItem, removeItem, updateQuantity } = useCart();

  const filtered = menuItems.filter(i => i.category === activeCategory && i.available);

  const getQty = (id: string) => cartItems.find(i => i.menuItem.id === id)?.quantity || 0;

  return (
    <CustomerLayout>
      <div className="px-4 pt-4">
        <h2 className="font-heading font-bold text-xl mb-4">Меню</h2>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border',
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-muted-foreground hover:border-primary/50'
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-3 mt-4">
          {filtered.map((item, i) => {
            const qty = getQty(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center text-2xl">
                  {menuCategories.find(c => c.id === item.category)?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-card-foreground">{item.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  <p className="font-bold text-primary text-sm mt-1">{item.price} ₴</p>
                </div>
                <div className="flex items-center gap-2">
                  {qty > 0 ? (
                    <>
                      <button onClick={() => updateQuantity(item.id, qty - 1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-accent transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">{qty}</span>
                      <button onClick={() => addItem(item)} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
                        <Plus className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button onClick={() => addItem(item)} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerMenu;
