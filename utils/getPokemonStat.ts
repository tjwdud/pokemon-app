export const makePokemonInfo = (id: number, name: string, stats, sprites) => {
  const pokemonStats = new Map();

  pokemonStats.set('id', id);
  pokemonStats.set('name', name);
  pokemonStats.set('image', sprites.other['official-artwork'].front_default);

  stats.forEach((stat) => {
    pokemonStats.set(stat.stat.name, stat.base_stat);
  });
  return Object.fromEntries(pokemonStats);
};
