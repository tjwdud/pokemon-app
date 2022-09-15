import { POKEMON_LAST_ID } from '../constants/index';

export const getRandomIds = (requireRandomNumber: number): Array<number> => {
  const ids: Set<number> = new Set();

  while (true) {
    if (ids.size === requireRandomNumber) break;
    ids.add(Math.floor(Math.random() * POKEMON_LAST_ID + 1));
  }
  return Array.from(ids);
};
