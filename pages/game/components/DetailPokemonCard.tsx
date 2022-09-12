import { usePokemonDetails } from '../../../hooks/usePokemonDetails';
import { makePokemonInfo } from '../../../utils/getPokemonStat';
import { useAddMyPokemon } from '../../../hooks/useAddMyPokemon';
import PokemonDetailCard from '../../../components/PokemonDetailCard';
const DetailPokemonCard = ({
  id,
  setIsModalOpen,
}: {
  id: number;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const { data, isLoading, isFetching } = usePokemonDetails(id);
  const { mutate } = useAddMyPokemon();
  if (isLoading) return <div>Loading</div>;
  const { name, types, base_experience, abilities, order, stats, sprites } =
    data;
  const pokemonInfo = makePokemonInfo(id, name, stats, sprites);

  const handlePokemonPick = () => {
    mutate(pokemonInfo);
    alert(`${name}가 내 포켓몬에 추가되었습니다.`);
    setIsModalOpen(false);
  };

  return (
    <div
      onClick={() => handlePokemonPick()}
      className="w-[300px] h-[300px] bg-gray-100 mt-20 ml-10 mr-10 flex justify-center cursor-pointer"
    >
      <PokemonDetailCard pokemonInfo={pokemonInfo} />
    </div>
  );
};

export default DetailPokemonCard;
