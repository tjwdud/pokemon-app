import Image from 'next/image';
import { useEffect, useState } from 'react';
import GetNewPokemonModal from './components/GetNewPokemonModal';
import { useMyPokemon } from '../../hooks/useMyPokemon';
import PokemonDetailCard from '@components/PokemonDetailCard';
import { IPokemon } from 'types/IPokemon';
import {
  dehydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { fetchMyPokemons } from '../../services/api';
import { NUMBER_OF_GAME_POKEMON } from '../../constants';
import { getRandomIds } from '../../utils/randomUtil';
import { usePokemonDetails } from 'hooks/usePokemonDetails';
import GameBoard from './components/GameBoard';
const Game = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isFetching } = useMyPokemon();
  const gamePokemonId = getRandomIds(NUMBER_OF_GAME_POKEMON);

  const startGame = () => {};

  useEffect(() => {
    if (data && data.length === 0) {
      setIsModalOpen(true);
      return;
    }
  }, [data]);

  if (isLoading) return <div>로딩</div>;
  return (
    <div className="flex items-center">
      <div className="mt-36 mr-auto ml-auto flex flex-col">
        <GameBoard gamePokemonId={gamePokemonId} />
        <div className=" w-[900px] min-h-[400px] bg-white mt-10 rounded-3xl">
          <p className="text-gray-500 ml-10 text-3xl mt-5">나의 포켓몬</p>
          {data.map((pokemon) => (
            <PokemonDetailCard pokemonInfo={pokemon} key={pokemon.id} />
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
