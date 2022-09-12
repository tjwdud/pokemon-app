import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../services/api';

export const usePokemonDetails = (id: number) => {
  return useQuery(['pokemonDetails', id], () => fetchPokemonDetails(id));
};
