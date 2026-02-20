import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plane, Calendar, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useActor } from '../hooks/useActor';
import { toast } from 'sonner';
import type { Flight } from '../backend';

interface BookingModalProps {
  flight: Flight | null;
  open: boolean;
  onClose: () => void;
}

function formatTime(time: bigint): string {
  const date = new Date(Number(time) / 1000000);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function BookingModal({ flight, open, onClose }: BookingModalProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    passengerName: '',
    discordUsername: '',
    robloxUsername: '',
  });

  const saveReservationMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !flight) throw new Error('Actor or flight not available');
      await actor.saveReservation(
        formData.passengerName,
        formData.discordUsername,
        formData.robloxUsername,
        flight.flightNumber
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      setSubmitted(true);
      toast.success('Flight reservation confirmed!');
    },
    onError: (error) => {
      toast.error(`Reservation failed: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveReservationMutation.mutate();
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ passengerName: '', discordUsername: '', robloxUsername: '' });
    onClose();
  };

  if (!flight) return null;

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px] glass-light border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Boarding Pass</DialogTitle>
          </DialogHeader>

          <div className="relative overflow-hidden rounded-xl border-2 border-airCanadaRed/20 bg-gradient-to-br from-white via-blue-50/30 to-white p-6 shadow-xl">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'url(/assets/generated/boarding-pass-bg.dim_600x800.png)',
                backgroundSize: 'cover',
              }}
            />

            <div className="relative space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/download.png"
                    alt="Air Canada"
                    className="h-10 w-10"
                  />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Flight</p>
                    <p className="text-2xl font-bold text-airCanadaRed">{flight.flightNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Aircraft</p>
                  <p className="text-sm font-semibold text-slate-700">{flight.aircraftType}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Passenger</p>
                <p className="text-lg font-bold text-slate-900">{formData.passengerName}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">From</p>
                  <p className="text-2xl font-bold text-slate-900">{flight.origin}</p>
                </div>
                <Plane className="h-6 w-6 text-airCanadaRed mx-4" />
                <div className="flex-1 text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">To</p>
                  <p className="text-2xl font-bold text-slate-900">{flight.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="h-4 w-4" />
                    <p className="text-xs uppercase tracking-wide">Departure</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {formatTime(flight.departureTime)}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="h-4 w-4" />
                    <p className="text-xs uppercase tracking-wide">Arrival</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {formatTime(flight.arrivalTime)}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-800">Booking Confirmed</p>
                </div>
                <p className="text-xs text-green-600">
                  Please arrive at the gate 30 minutes before departure
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleClose} className="w-full bg-airCanadaRed hover:bg-airCanadaRed/90">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] glass-light border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Reserve Your Flight</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Flight</p>
              <p className="text-lg font-bold text-airCanadaRed">{flight.flightNumber}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Route</p>
              <p className="text-sm font-semibold text-slate-700">
                {flight.origin} → {flight.destination}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passengerName" className="text-slate-700">
                Passenger Name *
              </Label>
              <Input
                id="passengerName"
                required
                value={formData.passengerName}
                onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                className="bg-white/50 border-slate-300"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discordUsername" className="text-slate-700">
                Discord Username *
              </Label>
              <Input
                id="discordUsername"
                required
                value={formData.discordUsername}
                onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                className="bg-white/50 border-slate-300"
                placeholder="username#1234"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="robloxUsername" className="text-slate-700">
                Roblox Username *
              </Label>
              <Input
                id="robloxUsername"
                required
                value={formData.robloxUsername}
                onChange={(e) => setFormData({ ...formData, robloxUsername: e.target.value })}
                className="bg-white/50 border-slate-300"
                placeholder="RobloxUser123"
              />
            </div>

            <Button
              type="submit"
              disabled={saveReservationMutation.isPending}
              className="w-full bg-airCanadaRed hover:bg-airCanadaRed/90 text-white font-semibold"
            >
              {saveReservationMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Confirming...
                </>
              ) : (
                'Confirm Reservation'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
