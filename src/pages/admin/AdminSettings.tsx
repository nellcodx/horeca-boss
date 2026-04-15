import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Globe, DollarSign, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-heading font-bold text-2xl">Settings</h2>
          <p className="text-muted-foreground text-sm">System configuration</p>
        </div>

        <div className="grid gap-4">
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground"><Globe className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold text-card-foreground">Language</h3>
                <p className="text-sm text-muted-foreground">Primary and secondary languages</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-primary bg-primary/5">
                <div className="text-xs text-muted-foreground mb-1">Primary</div>
                <div className="font-medium text-card-foreground">🇬🇧 English</div>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">Secondary</div>
                <div className="font-medium text-card-foreground">🇺🇦 Ukrainian</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground"><DollarSign className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold text-card-foreground">Currency</h3>
                <p className="text-sm text-muted-foreground">Currency for prices and billing</p>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-primary bg-primary/5">
              <div className="font-medium text-card-foreground">€ EUR — Euro</div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground"><Building2 className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold text-card-foreground">Venue Type</h3>
                <p className="text-sm text-muted-foreground">Choose your business type</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Restaurant', 'Café', 'Bar', 'Food Court', 'Chain'].map((type, i) => (
                <span key={type} className={cn('px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer', i === 0 ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/50')}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
