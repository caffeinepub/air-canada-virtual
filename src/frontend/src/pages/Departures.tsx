import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { Button } from '@/components/ui/button';
import BookingModal from '../components/BookingModal';
import { Plane, Clock, MapPin } from 'lucide-react';
import type { Flight } from '../backend';

function formatTime(time: bigint): string {
  const date = new Date(Number(time) / 1000000);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Departures() {
  const { actor, isFetching: actorLoading } = useActor();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: flights, isLoading } = useQuery<Flight[]>({
    queryKey: ['flights'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFlights();
    },
    enabled: !!actor && !actorLoading,
  });

  const handleBook = (flight: Flight) => {
    setSelectedFlight(flight);
    setModalOpen(true);
  };

  if (isLoading || actorLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <Plane className="h-12 w-12 text-airCanadaRed animate-pulse mx-auto" />
          <p className="text-white/60">Loading departures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-light rounded-2xl p-6 border border-white/20">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Flight Departures</h2>
        <p className="text-slate-600">Book your next virtual flight with Air Canada Virtual</p>
      </div>

      {!flights || flights.length === 0 ? (
        <div className="glass-light rounded-2xl p-12 text-center border border-white/20">
          <Plane className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">No flights scheduled at this time</p>
          <p className="text-slate-500 text-sm mt-2">Check back soon for new departures</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {flights.map((flight) => (
            <div
              key={flight.flightNumber}
              className="glass-light rounded-xl p-6 border border-white/20 hover:border-airCanadaRed/30 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-airCanadaRed/10 rounded-lg p-2">
                      <Plane className="h-5 w-5 text-airCanadaRed" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Flight</p>
                      <p className="text-xl font-bold text-airCanadaRed">{flight.flightNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <MapPin className="h-4 w-4" />
                        <p className="text-xs uppercase tracking-wide">Route</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        {flight.origin} → {flight.destination}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Plane className="h-4 w-4" />
                        <p className="text-xs uppercase tracking-wide">Aircraft</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{flight.aircraftType}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Clock className="h-4 w-4" />
                        <p className="text-xs uppercase tracking-wide">Departure</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        {formatTime(flight.departureTime)}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleBook(flight)}
                  className="bg-airCanadaRed hover:bg-airCanadaRed/90 text-white font-semibold px-8"
                >
                  Book Flight
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BookingModal flight={selectedFlight} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
