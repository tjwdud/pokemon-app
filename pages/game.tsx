/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useState } from 'react';
const Game = () => {
  const [state, setState] = useState([]);

  return (
    <div className="flex items-center">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[2000px] h-[400px]"></div>
    </div>
  );
};

export default Game;
