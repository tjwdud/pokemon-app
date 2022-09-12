import { POKEMON_LAST_ID } from '../constants/index';

export const getRandomIds = (requireRandomNumber: number) => {
  const ids = new Set();
  if (requireRandomNumber === 1) {
    return Math.floor(Math.random() * POKEMON_LAST_ID + 1);
  }
  while (true) {
    if (ids.size === requireRandomNumber) break;
    ids.add(Math.floor(Math.random() * POKEMON_LAST_ID + 1));
  }

  return Array.from(ids);
};
