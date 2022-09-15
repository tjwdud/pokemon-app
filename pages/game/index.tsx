import { useEffect, useState } from 'react';
import GetNewPokemonModal from './components/GetNewPokemonModal';
import { useMyPokemon } from '../../hooks/useMyPokemon';
import PokemonDetailCard from '@components/PokemonDetailCard';
import { IPokemon } from 'types/IPokemon';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchMyPokemons } from '../../services/api';
import { isEmptyObj } from '../../utils/gameUtils';

import GameBoard from './components/GameBoard';

const Game = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myPokemon, setMyPokemon] = useState<IPokemon>({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [isStartGame, setIsStartGame] = useState(false);

  const { data, isLoading, isFetching } = useMyPokemon();

  const startGame = () => {
    setIsStartGame(true);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (data && data.length === 0) {
      setIsModalOpen(true);
      return;
    }
  }, [data]);
  const handlePickMyPokemon = (pokemon: IPokemon) => {
    setMyPokemon(pokemon);
    setIsDisabled(true);
  };
  if (isLoading) return <div>로딩</div>;

  return (
    <div className="flex items-center">
      <div className="mt-36 mr-auto ml-auto flex">
        {isStartGame ? (
          <GameBoard myPokemon={myPokemon} />
        ) : (
          <div className="flex flex-col bg-bgImg w-[900px] h-[600px] bg-cover bg-backOpacity bg-no-repeat rounded-3xl rounded-r-3xl">
            <button
              onClick={() => startGame()}
              className="mt-[30%] w-[200px] text-white bg-gray-800 rounded-full px-5 py-2.5  mb-2 m-auto"
            >
              게임시작
            </button>
          </div>
        )}

        <div className=" w-[900px] h-[600px] bg-white rounded-3xl overflow-y-auto ml-5 scrollbar-hide">
          <p className="text-gray-500 ml-10 text-3xl mt-5 mb-5 ">나의 포켓몬</p>
          {data.map((pokemon: IPokemon) => (
            <div
              onClick={() => handlePickMyPokemon(pokemon)}
              key={pokemon.id}
              className={`${
                (isDisabled || !isStartGame) && 'pointer-events-none opacity-30'
              }`}
            >
              <PokemonDetailCard
                pokemonInfo={pokemon}
                layoutDirection={'row'}
                isBig={'false'}
                key={pokemon.id}
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && <GetNewPokemonModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};
export async function getServerProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['myPokemonList'], () => fetchMyPokemons());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default Game;
