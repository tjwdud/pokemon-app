import axios from 'axios';
import { URL } from '../constants';
import { IPokemon } from '../types/IPokemon';
export const fetchPokemons = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(`${URL.POKEMON_URL}/pokemon`, {
    params: {
      limit: 40,
      offset: pageParam,
    },
  });
  return data;
};

export const fetchPokemonDetails = async (pokemonID: number) => {
  const { data } = await axios.get(`${URL.POKEMON_URL}/pokemon/${pokemonID}`);
  return data;
};

export const fetchMyPokemons = async () => {
  try {
    const res = await axios.get(`${URL.SERVER_URL}/pokemons`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchAddMyPokemon = async (
  newPokemon: IPokemon
): Promise<IPokemon> => {
  const { data } = await axios.post<IPokemon>(
    `${URL.SERVER_URL}/pokemons`,
    newPokemon
  );
  return data;
};
