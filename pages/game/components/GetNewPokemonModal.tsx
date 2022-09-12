import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getRandomIds } from '../../../utils/randomUtil';
import DetailPokemonCard from '../components/DetailPokemonCard';
import { RANDOM_CARD_NUMBER } from '../../../constants';

const GetNewPokemonModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) => {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    const newIds = getRandomIds(RANDOM_CARD_NUMBER);
    setIds(newIds);
  }, []);
  console.log(ids);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 h-full z-40 bg-blackRgba">
      <div className="rounded bg-white opacity-100 flex flex-col absolute justify-center w-[1200px] min-h-[900px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        <p className="text-center font-semibold">첫 포켓몬을 골라보세요</p>
        <div className="flex">
          {ids.map((id, idx) => (
            <DetailPokemonCard
              id={Number(id)}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetNewPokemonModal;
