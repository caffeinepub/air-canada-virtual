import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetFlightStatus, useSetFlightStatus } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Activity, Loader2 } from 'lucide-react';

const STATUS_OPTIONS = [
  'On Time',
  'Delayed',
  'Cancelled',
  'Boarding',
  'Departed',
  'Maintenance',
  'Weather Hold',
];

export default function FlightStatusEditor() {
  const { data: currentStatus, isLoading: statusLoading } = useGetFlightStatus();
  const setStatusMutation = useSetFlightStatus();
  const [selectedStatus, setSelectedStatus] = useState<string>('On Time');

  useEffect(() => {
    if (currentStatus?.status) {
      setSelectedStatus(currentStatus.status);
    }
  }, [currentStatus]);

  const handleSave = () => {
    setStatusMutation.mutate(selectedStatus, {
      onSuccess: () => {
        toast.success('Flight status updated successfully!');
      },
      onError: (error) => {
        toast.error('Failed to update status: ' + error.message);
      },
    });
  };

  return (
    <div className="glass-light rounded-2xl p-6 space-y-6 border border-white/20">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <Activity className="h-6 w-6 text-airCanadaRed" />
        <h3 className="text-xl font-bold text-slate-900">Flight Status Management</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status" className="text-slate-700">
            Current Operational Status
          </Label>
          {statusLoading ? (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading current status...</span>
            </div>
          ) : (
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger id="status" className="bg-white/50 border-slate-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <Button
          onClick={handleSave}
          disabled={setStatusMutation.isPending || statusLoading}
          className="w-full bg-airCanadaRed hover:bg-airCanadaRed/90 text-white font-semibold"
        >
          {setStatusMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Status'
          )}
        </Button>
      </div>
    </div>
  );
}
