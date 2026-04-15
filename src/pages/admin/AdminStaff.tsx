import { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { staffMembers, roleLabels, UserRole } from '@/data/mock';
import { Plus, Edit2, Trash2, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminStaff = () => {
  const [staff] = useState(staffMembers);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-2xl">Staff</h2>
            <p className="text-muted-foreground text-sm">{staff.length} employees</p>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staff.map(member => (
            <div key={member.id} className="p-5 rounded-xl bg-card border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">{roleLabels[member.role].en}</span>
                  <span className={cn('w-2 h-2 rounded-full', member.active ? 'bg-success' : 'bg-muted-foreground')} />
                  <span className="text-xs text-muted-foreground">{member.active ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStaff;
