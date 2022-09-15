import { useEffect, useState, useRef } from 'react';
import { usePokemonDetails } from 'hooks/usePokemonDetails';
import { makePokemonInfo } from 'utils/makePokemonInfo';
import { IPokemon } from '../../../types/IPokemon';
import HpBar from './HpBar';
import { getRandomIds } from '../../../utils/randomUtil';
import {
  convertPercentage,
  attackAnimation,
  whosFirstAttackerDefender,
} from '../../../utils/gameUtils';
import { isEmptyObj } from '../../../utils/gameUtils';
import { useAddMyPokemon } from '../../../hooks/useAddMyPokemon';
const GameBoard = ({ myPokemon }: { myPokemon: IPokemon }) => {
  const attacker = useRef<IPokemon>({});
  const defender = useRef<IPokemon>({});
  const gamePokemonIdRef = useRef<number>(getRandomIds(1)[0]);
  const [gamePokemonHp, setGamePokemonHp] = useState(0);
  const [myPokemonHp, setMyPokemonHp] = useState(0);
  const [remainChance, setRemainChance] = useState(3);
  const [isAttackedGame, setIsAttackedGame] = useState(false);
  const [isAttackedMe, setIsAttackedMe] = useState(false);
  const [isBtnDisAbled, setIsBtnDisAbled] = useState(false);
  const [runPokemon, setRunPokemon] = useState(false);
  const [isCatchPokemon, setIsCatchPokemon] = useState(false);
  const [message, setMessage] = useState('');
  const [winner, setWinner] = useState('');
  const winnerRef = useRef('');
  const { mutate } = useAddMyPokemon();

  useEffect(() => {
    if (!isEmptyObj(myPokemon)) {
      setMyPokemonHp(() => myPokemon.hp);
      setGamePokemonHp(() => gamePokemon.hp);
      setIsBtnDisAbled(() => false);
    }
  }, [myPokemon]);
  useEffect(() => {
    if (winner === 'myPokemon') {
      setIsBtnDisAbled(true);
      mutate(gamePokemon);
      setIsCatchPokemon(true);
      setMessage('포켓몬을 잡았어요🥳');
    }
    if (winner === 'gamePokemon') {
      setIsBtnDisAbled(true);
      setRunPokemon(true);

      setMessage('내 포켓몬이 졌어요💀');
    }
  }, [winner]);
  useEffect(() => {
    if (remainChance <= 0) {
      setRunPokemon(true);
      setIsBtnDisAbled(true);
      setMessage('10번안에 잡지 못해서 포켓몬이 도망갔어요😓');
    }
  }, [remainChance]);

  const {
    data: gamePokemonData,
    isLoading: gameIsLoading,
    isFetching: gameIsFetching,
  } = usePokemonDetails(gamePokemonIdRef.current);

  if (gameIsLoading)
    return (
      <div className="flex flex-col bg-bgImg w-[900px] h-[600px] bg-cover bg-backOpacity bg-no-repeat rounded-3xl rounded-r-3xl" />
    );
  const { id, name, stats, sprites } = gamePokemonData;

  const gamePokemon = makePokemonInfo(id, name, stats, sprites);

  const attack = (attacker: IPokemon, defender: IPokemon) => {
    setRemainChance(() => remainChance - 1);

    const attackPoint = defender.defense - attacker.attack;
    if (attackPoint < 0) {
      if (attacker === gamePokemon) {
        attackAnimation(setIsAttackedMe);
        if (myPokemonHp + attackPoint <= 0) {
          setMyPokemonHp(() => 0);
          winnerRef.current = 'gamePokemon';
          setWinner('gamePokemon');
          setIsBtnDisAbled(true);
          return;
        }
        setMyPokemonHp(() => (myPokemon.hp, myPokemonHp + attackPoint));
      }
      if (attacker === myPokemon) {
        attackAnimation(setIsAttackedGame);
        if (gamePokemonHp + attackPoint <= 0) {
          setGamePokemonHp(() => 0);
          winnerRef.current = 'myPokemon';
          setWinner('myPokemon');
          setIsBtnDisAbled(true);
          return;
        }
        setGamePokemonHp(() => (gamePokemon.hp, gamePokemonHp + attackPoint));
      }
      return;
    }
    if (attacker === gamePokemon) {
      attackAnimation(setIsAttackedMe);
      if (myPokemonHp - 2 <= 0) {
        setMyPokemonHp(() => 0);
        winnerRef.current = 'myPokemon';
        setWinner('gamePokemon');
        setIsBtnDisAbled(true);
        return;
      }

      setMyPokemonHp(() => (myPokemon.hp, myPokemonHp - 2));
      return;
    }
    if (attacker === myPokemon) {
      attackAnimation(setIsAttackedGame);
      if (gamePokemonHp - 2 <= 0) {
        winnerRef.current = 'myPokemon';
        setWinner('myPokemon');
        setGamePokemonHp(() => (gamePokemon.hp, gamePokemonHp - 2));
        setIsBtnDisAbled(true);
        return;
      }

      setGamePokemonHp(() => (gamePokemon.hp, gamePokemonHp - 2));
      return;
    }
  };

  const handleAttackButtonClick = () => {
    if (isEmptyObj(myPokemon)) {
      alert('나의 포켓몬을 먼저 골라주세요');
      return;
    }
    setIsBtnDisAbled(true);
    const { firstAttacker, firstDefender } = whosFirstAttackerDefender(
      gamePokemon,
      myPokemon
    );

    attacker.current = firstAttacker;
    defender.current = firstDefender;
    if (!winnerRef.current && remainChance > 0) {
      attack(attacker.current, defender.current);
    }
    setTimeout(() => {
      if (!winnerRef.current && remainChance > 0) {
        attack(defender.current, attacker.current);
      }
      if (!winnerRef.current) {
        setIsBtnDisAbled(false);
      }
    }, 3000);

    return;
  };

  return (
    <div className="flex flex-col bg-bgImg w-[900px] h-[600px] bg-cover bg-backOpacity bg-no-repeat rounded-3xl rounded-r-3xl">
      <p className="self-center mt-[20px] text-2xl">{message}</p>

      <div className="mt- flex w-[40] text-center align-baseline justify-end mr-10">
        <button
          disabled={isBtnDisAbled}
          onClick={() => handleAttackButtonClick()}
          className={`${isBtnDisAbled && 'opacity-50 '}`}
        >
          <img
            src="/assets/img/monsterBall.png"
            alt="pokeball"
            className="w-[50px] h-[50px]"
          />
        </button>

        <p className="self-center ml-2 text-2xl">남은 기회: {remainChance}</p>
      </div>
      <div className="flex justify-start">
        <img
          src={gamePokemon.image}
          alt={gamePokemon.name}
          className={`${
            runPokemon && 'scale-0 transition duration-500 ease-in-out'
          } ${
            isCatchPokemon &&
            'translate-y-[500px] scale-0 transition duration-500 ease-in-out'
          } ${isAttackedGame && 'animate-vibration hue-rotate-180'}
          
          w-[270px] h-[270px] bg-opacity-100 `}
        />

        <div className="flex">
          <div className="w-[500px] mt-[100px]">
            <HpBar
              percentage={convertPercentage(gamePokemon.hp, gamePokemonHp)}
              color={'red'}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {Object.keys(myPokemon).length === 0 ? (
          <img
            src="/assets/img/questionMark.png"
            alt="questionMark"
            className="w-[250px] h-[250px]"
          />
        ) : (
          <>
            <div className="flex">
              <div className="w-[500px] mt-[100px]">
                <HpBar
                  percentage={convertPercentage(myPokemon.hp, myPokemonHp)}
                  color={'green'}
                />
              </div>

              <img
                src={myPokemon.image}
                alt={myPokemon.name}
                className={`${
                  isAttackedMe && 'animate-vibration hue-rotate-180 '
                }
                w-[280px] h-[280px]`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
