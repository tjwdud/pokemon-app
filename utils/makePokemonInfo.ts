import { IStats, ISprites } from '../types/IPokemon';
export const makePokemonInfo = (
  id: number,
  name: string,
  stats: Array<IStats>,
  sprites: ISprites
) => {
  const pokemonStats = new Map();
  console.log('stats', stats);
  console.log('sprites', sprites);
  pokemonStats.set('id', id);
  pokemonStats.set('name', name);
  pokemonStats.set('image', sprites.other['official-artwork'].front_default);

  stats.forEach((stat) => {
    if (
      stat.stat.name !== 'special-attack' &&
      stat.stat.name !== 'special-defense'
    ) {
      pokemonStats.set(stat.stat.name, stat.base_stat);
    }
  });
  return Object.fromEntries(pokemonStats);
};
