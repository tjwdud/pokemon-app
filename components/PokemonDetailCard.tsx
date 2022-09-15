import HpBar from 'pages/game/components/HpBar';
import { IPokemon } from 'types/IPokemon';

const PokemonDetailCard = ({
  pokemonInfo,
  layoutDirection,
  isBig,
}: {
  pokemonInfo: IPokemon;
  layoutDirection: string;
  isBig: string;
}) => {
  const { id, name, hp, attack, defense, image, speed } = pokemonInfo;
  console.log(isBig);
  return (
    <div
      className={`flex ${
        layoutDirection === 'col' ? 'flex-col' : 'flex-row ml-20'
      }`}
    >
      <img
        src={image}
        alt={name}
        className={`${
          isBig === 'true' ? 'w-[600px] h-[600px]' : 'w-[200px] h-[200px]'
        }  `}
      />

      <div
        className={`${
          layoutDirection === 'row' ? 'mt-10 ml-20 w-[50%]' : 'w-[100%]'
        }`}
      >
        <div className={`${layoutDirection === 'row' ? 'flex' : 'flex-col '}`}>
          {name}
        </div>

        <div className={`${layoutDirection === 'row' ? 'flex' : 'flex-col'}`}>
          <p className="w-[60px] text-xl">체력</p>
          <HpBar percentage={hp} color={'emerald'} />
        </div>
        <div className={`${layoutDirection === 'row' ? 'flex' : 'flex-col'}`}>
          <p className="w-[60px] text-xl">공격력</p>{' '}
          <HpBar percentage={attack} color={'cyan'} />
        </div>
        <div className={`${layoutDirection === 'row' ? 'flex' : 'flex-col'}`}>
          <p className="w-[60px] text-xl">방어력</p>{' '}
          <HpBar percentage={defense} color={'sky'} />
        </div>
        <div className={`${layoutDirection === 'row' ? 'flex' : 'flex-col'}`}>
          <p className="w-[60px] text-xl">스피드</p>{' '}
          <HpBar percentage={speed} color={'indigo'} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailCard;
