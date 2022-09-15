import axios from 'axios';
import { fetchPokemonDetails } from '../../services/api';
import { Hydrate, QueryClient, dehydrate } from '@tanstack/react-query';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import { useRouter } from 'next/router';
import { makePokemonInfo } from '../../utils/makePokemonInfo';
import PokemonDetailCard from '../../components/PokemonDetailCard';
const Pokemon = ({ params }) => {
  const router = useRouter();
  const { pokeId } = router.query;

  const { data, isLoading, isFetching } = usePokemonDetails(Number(pokeId));
  const { name, id, stats, sprites } = data;
  const pokemonInfo = makePokemonInfo(id, name, stats, sprites);
  if (isLoading) return <div className="w-[400px] bg-black">Loading</div>;

  return (
    <div className="flex justify-center w-[60%] m-auto bg-sky-100 pb-10">
      <PokemonDetailCard
        pokemonInfo={pokemonInfo}
        layoutDirection={'col'}
        isBig={'true'}
      />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['pokemonDetails', Number(params.pokeId)],
    () => fetchPokemonDetails(params.pokeId)
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Pokemon;
