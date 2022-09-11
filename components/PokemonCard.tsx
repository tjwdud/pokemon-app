/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useLocalStorage from 'use-local-storage';
import { useObserver } from '../hooks/useObserver';

const PokemonCard = ({ id, name }: { id: number; name: string }) => {
  const target = useRef(null);
  const [visible, setVisible] = useState(false);

  const [scrollY, setScrollY] = useLocalStorage('poke_list_scroll', 0);

  const onIntersect = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1,
  });

  return (
    <Link href={`/pokemon/${id}`} key={name}>
      <a
        className="bg-white p-4 rounded-lg flex flex-col w-[200px] min-h-[200px]"
        ref={target}
        onClick={() => setScrollY(window.scrollY)}
      >
        {visible && (
          <>
            <div className="flex">
              <p className="text-center text-base font-medium bg-gray-200 rounded-lg w-[30px] mr-[10px]">
                {id}
              </p>
              <p className="text-base font-semibold capitalize ">{name}</p>
            </div>

            <LazyLoadImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={name}
              className="w-[150px] h-[150px] self-center"
            />
          </>
        )}
      </a>
    </Link>
  );
};

export default PokemonCard;
