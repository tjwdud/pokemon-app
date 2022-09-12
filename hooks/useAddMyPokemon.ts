import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { fetchAddMyPokemon } from '../services/api';
import { IPokemon } from 'types/IPokemon';

export const useAddMyPokemon = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newPokemon: IPokemon) => fetchAddMyPokemon(newPokemon),
    {
      onSuccess: () => {
        console.log('성공');
        queryClient.invalidateQueries(['myPokemonList']);
      },
    }
  );

  return mutation;
};
