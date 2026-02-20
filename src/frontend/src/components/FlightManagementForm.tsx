import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActor } from '../hooks/useActor';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plane } from 'lucide-react';

export default function FlightManagementForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    aircraftType: '',
    departureTime: '',
    arrivalTime: '',
  });

  const addFlightMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');

      const departureMs = new Date(formData.departureTime).getTime();
      const arrivalMs = new Date(formData.arrivalTime).getTime();

      await actor.addFlight(
        formData.flightNumber,
        formData.origin,
        formData.destination,
        formData.aircraftType,
        BigInt(departureMs * 1000000),
        BigInt(arrivalMs * 1000000)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      toast.success('Flight published successfully!');
      setFormData({
        flightNumber: '',
        origin: '',
        destination: '',
        aircraftType: '',
        departureTime: '',
        arrivalTime: '',
      });
    },
    onError: (error) => {
      toast.error('Failed to publish flight: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.flightNumber ||
      !formData.origin ||
      !formData.destination ||
      !formData.aircraftType ||
      !formData.departureTime ||
      !formData.arrivalTime
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    addFlightMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-2xl p-6 space-y-6 border border-white/20">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <Plane className="h-6 w-6 text-airCanadaRed" />
        <h3 className="text-xl font-bold text-slate-900">Add New Flight</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="flightNumber" className="text-slate-700">
            Flight Number
          </Label>
          <Input
            id="flightNumber"
            placeholder="AC851"
            value={formData.flightNumber}
            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
            className="bg-white/50 border-slate-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aircraftType" className="text-slate-700">
            Aircraft Model
          </Label>
          <Input
            id="aircraftType"
            placeholder="Boeing 787-8"
            value={formData.aircraftType}
            onChange={(e) => setFormData({ ...formData, aircraftType: e.target.value })}
            className="bg-white/50 border-slate-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="origin" className="text-slate-700">
            Origin City
          </Label>
          <Input
            id="origin"
            placeholder="Toronto (YYZ)"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            className="bg-white/50 border-slate-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination" className="text-slate-700">
            Destination City
          </Label>
          <Input
            id="destination"
            placeholder="London (LHR)"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="bg-white/50 border-slate-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureTime" className="text-slate-700">
            Departure Time
          </Label>
          <Input
            id="departureTime"
            type="datetime-local"
            value={formData.departureTime}
            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
            className="bg-white/50 border-slate-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="arrivalTime" className="text-slate-700">
            Arrival Time
          </Label>
          <Input
            id="arrivalTime"
            type="datetime-local"
            value={formData.arrivalTime}
            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
            className="bg-white/50 border-slate-300"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={addFlightMutation.isPending}
        className="w-full bg-airCanadaRed hover:bg-airCanadaRed/90 text-white font-semibold"
      >
        {addFlightMutation.isPending ? 'Publishing...' : 'Publish Flight'}
      </Button>
    </form>
  );
}
