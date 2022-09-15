export interface IPokemon {
  id: number;
  name: string;
  image: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface IStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
interface ISpriteVariant {
  back_default: string | null;
  back_female: string | null;
  back_gray: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_gray: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}
export interface IPokemonSpriteOther {
  dream_world: Pick<ISpriteVariant, 'front_default' | 'front_female'>;
  'official-artwork': {
    front_default: string;
  };
}

export interface ISprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: IPokemonSpriteOther;
  versions: Object;
}
