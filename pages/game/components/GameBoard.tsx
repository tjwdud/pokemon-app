import { useState } from 'react';

import { usePokemonDetails } from 'hooks/usePokemonDetails';

const GameBoard = ({ gamePokemonId }: { gamePokemonId: number }) => {
  console.log(gamePokemonId);
  const [percentage, setPercentage] = useState(0);
  const { data, isLoading, isFetching } = usePokemonDetails(gamePokemonId);

  if (isLoading) return <div>Loading</div>;
  console.log(data.name);
  const oo = () => {
    console.log(`${percentage}%`, 'percentage');
    console.log(`w-${String(percentage)}` + '%', 'percentage');
    setPercentage(percentage + 10);
  };
  return (
    <div className="bg-bgImg w-[900px] h-[600px] bg-cover bg-backOpacity bg-no-repeat rounded-3xl rounded-r-3xl">
      {data.name} {data.id}
      <img
        src={data.sprites.other['official-artwork'].front_default}
        alt={data.name}
        className="w-[300px] h-[300px] bg-opacity-100"
      />
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className={`transition-all ease-out duration-1000 bg-green-600 h-2.5 rounded-full dark:bg-green-500 w-20%`}
        >
          {percentage}
        </div>
      </div>
      <button onClick={() => oo()}>버튼</button>
      {percentage}
    </div>
  );
};

export default GameBoard;
