import type { NextPage } from 'next';

import PokemonList from '../components/PokemonList';
import Image from 'next/image';
import Link from 'next/Link';
const Home: NextPage = () => {
  return (
    <div>
      <div className="flex">
        <Image src="/assets/img/logo.png" width={200} height={100} alt="logo" />
        <Link href={'/game'}>
          <a>게임하기</a>
        </Link>
      </div>

      <PokemonList />
    </div>
  );
};

export default Home;
