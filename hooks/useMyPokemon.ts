import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { fetchMyPokemons } from '../services/api';
import { IPokemon } from 'types/IPokemon';

export const useMyPokemon = () => {
  return useQuery(['myPokemonList'], () => fetchMyPokemons());
};
