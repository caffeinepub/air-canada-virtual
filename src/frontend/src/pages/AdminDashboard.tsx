import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import FlightManagementForm from '../components/FlightManagementForm';
import FlightStatusEditor from '../components/FlightStatusEditor';
import { LogOut, Shield } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate({ to: '/admin-ops' });
  };

  return (
    <div className="space-y-6">
      <div className="glass-light rounded-2xl p-6 border border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-airCanadaRed/10 rounded-lg p-2">
            <Shield className="h-6 w-6 text-airCanadaRed" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Operations</h2>
            <p className="text-sm text-slate-600">Flight Management Dashboard</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-slate-300 hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FlightStatusEditor />
        <FlightManagementForm />
      </div>
    </div>
  );
}
