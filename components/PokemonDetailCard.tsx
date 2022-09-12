import { IPokemon } from 'types/IPokemon';

const PokemonDetailCard = ({ pokemonInfo }: { pokemonInfo: IPokemon }) => {
  const { id, name, hp, attack, defense, image } = pokemonInfo;
  console.log(image, 'image');
  return (
    <div>
      <img src={image} alt={name} className="w-[200px] h-[200px]" />
      <p className="text-center">{name}</p>
      <p className="text-center">체력: {hp}</p>
      <p className="text-center">공격력: {attack}</p>
      <p className="text-center">방어력: {defense}</p>
    </div>
  );
};

export default PokemonDetailCard;
