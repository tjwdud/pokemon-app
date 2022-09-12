import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';
import { useObserver } from '../hooks/useObserver';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemons } from '../services/api';

const PokemonList = () => {
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('poke_list_scroll', 0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['pokemonList'], fetchPokemons, {
    getNextPageParam: (lastPage) => {
      const { next } = lastPage;
      if (!next) return false;

      const offset = new URL(next).searchParams.get('offset');
      return Number(offset);
    },
  });

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });
  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <div className="w-[1200px] my-0 mx-auto py-[1rem] px-0 ">
      {status === 'loading' && <p>로딩 중</p>}

      {status === 'error' && <p>{error.message}</p>}

      {status === 'success' && (
        <div>
          {data.pages.map((group, index) => (
            <div
              className="grid grid-cols-4 gap-4 mb-4 place-items-center"
              key={index}
            >
              {group.results.map((pokemon) => {
                const { name, url } = pokemon;
                const id = url.split('/')[6];

                return <PokemonCard key={name} id={id} name={name} />;
              })}
            </div>
          ))}
        </div>
      )}

      <div ref={bottom} />
    </div>
  );
};

export default PokemonList;
