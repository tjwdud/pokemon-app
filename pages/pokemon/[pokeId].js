import axios from 'axios';
import { fetchPokemonDetails } from '../../services/api';
import { Hydrate, QueryClient, dehydrate } from '@tanstack/react-query';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import { useRouter } from 'next/router';
const Pokemon = ({ params }) => {
  const router = useRouter();
  const { pokeId } = router.query;
  console.log(pokeId);
  const { data, isLoading, isFetching } = usePokemonDetails(Number(pokeId));
  const { name, types, id, base_experience, abilities, order, stats, sprites } =
    data;

  if (isLoading) return <div className="w-[400px] bg-black">Loading</div>;
  console.log(isLoading, isFetching);
  return (
    <div>
      <div>
        <img src={sprites.other['official-artwork'].front_default} alt={name} />
        <h1>{name}</h1>
      </div>

      <div>
        <div>
          <p>ID</p>
          <p>{id}</p>
        </div>

        <div>
          <p>기본 경험치</p>
          <p>{base_experience} exp</p>
        </div>
      </div>
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
