import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchPokemons = async ({ pageParam = 40 }) => {
  const { data } = await api.get('/pokemon', {
    params: {
      limit: 40,
      offset: pageParam,
    },
  });
  return data;
};

export const fetchPokemonDetails = async (pokemonID: number) => {
  const { data } = await api.get(`/pokemon/${pokemonID}`);
  return data;
};
