import { IPokemon } from '../types/IPokemon';
export const convertPercentage = (totalHp: number, hp: number) => {
  console.log((hp * 100) / totalHp);
  return (hp * 100) / totalHp;
};

export const isEmptyObj = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

export const attackAnimation = (isAttackFunc: (value: boolean) => void) => {
  isAttackFunc(true);
  setTimeout(() => {
    isAttackFunc(false);
  }, 2000);
};

export const whosFirstAttackerDefender = (
  gamePokemon: IPokemon,
  myPokemon: IPokemon
) => {
  if (gamePokemon.speed > myPokemon.speed) {
    return { firstAttacker: gamePokemon, firstDefender: myPokemon };
  }

  return { firstAttacker: myPokemon, firstDefender: gamePokemon };
};
