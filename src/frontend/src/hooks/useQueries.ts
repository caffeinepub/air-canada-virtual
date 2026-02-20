import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { FlightStatus } from '../backend';

// Query hook for getting flight status
export function useGetFlightStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<FlightStatus | null>({
    queryKey: ['flightStatus'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFlightStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Mutation hook for setting flight status
export function useSetFlightStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setFlightStatus(status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightStatus'] });
    },
  });
}
