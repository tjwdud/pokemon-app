import type { NextPage } from 'next';
import PokemonList from '../components/PokemonList';
const Home: NextPage = () => {
  return (
    <div>
      <PokemonList />
    </div>
  );
};

export default Home;
