import { useGetFlightStatus } from '../hooks/useQueries';
import { Clock, AlertCircle, CheckCircle, XCircle, Plane } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function FlightStatusIndicator() {
  const { data: statusData, isLoading, isError } = useGetFlightStatus();

  if (isLoading) {
    return (
      <div className="glass-dark border border-white/10 rounded-lg px-4 py-2 inline-flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  if (isError || !statusData) {
    return (
      <div className="glass-dark border border-white/10 rounded-lg px-4 py-2 inline-flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-slate-400" />
        <span className="text-sm text-slate-400">Status unavailable</span>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus.includes('on time') || normalizedStatus.includes('boarding') || normalizedStatus.includes('departed')) {
      return 'text-green-400';
    }
    if (normalizedStatus.includes('delayed')) {
      return 'text-yellow-400';
    }
    if (normalizedStatus.includes('cancelled')) {
      return 'text-red-400';
    }
    return 'text-blue-400';
  };

  const getStatusIcon = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus.includes('on time') || normalizedStatus.includes('boarding') || normalizedStatus.includes('departed')) {
      return <CheckCircle className="h-4 w-4" />;
    }
    if (normalizedStatus.includes('delayed')) {
      return <Clock className="h-4 w-4" />;
    }
    if (normalizedStatus.includes('cancelled')) {
      return <XCircle className="h-4 w-4" />;
    }
    return <Plane className="h-4 w-4" />;
  };

  const statusColor = getStatusColor(statusData.status);
  const statusIcon = getStatusIcon(statusData.status);

  return (
    <div className="glass-dark border border-white/10 rounded-lg px-4 py-2 inline-flex items-center gap-2">
      <div className={statusColor}>{statusIcon}</div>
      <span className={`text-sm font-medium ${statusColor}`}>
        Operations: {statusData.status}
      </span>
    </div>
  );
}
