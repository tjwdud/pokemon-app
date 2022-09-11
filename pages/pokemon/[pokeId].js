import axios from 'axios';
import { fetchPokemonDetails } from '../../services/api';
const Pokemon = ({ data }) => {
  const { name, types, id, base_experience, abilities, order, stats } = data;

  // stats.forEach((stat) => console.log(stat.base_stat, stat.stat.name));

  return (
    <div>
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
        />
        <h1>{name}</h1>
      </div>

      <div>
        <div>
          <p>ID</p>
          <p>{id}</p>
        </div>

        <div>
          <p>기본 경험치</p>
          <p>{base_experience} exp</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const data = await fetchPokemonDetails(params.pokeId);

  return { props: { data } };
};

export default Pokemon;
