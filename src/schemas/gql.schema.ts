export interface GetPokemonsResponse {
  pokemon: {
    id: number;
    pokemonspecy: {
      pokemonspeciesnames: {
        name: string;
        __typename: string;
      }[];
      __typename: string;
    };
    pokemonsprites: {
      sprites: string;
      __typename: string;
    }[];
    pokemontypes: {
      type: {
        typenames: {
          name: string;
          __typename: string;
        }[];
        __typename: string;
      };
      __typename: string;
    }[];
    __typename: string;
  }[];
}

export interface GetPokemonDetailsResponse {
  pokemon: {
    id: number;
    pokemonspecy: {
      pokemonspeciesnames: {
        name: string;
        __typename: string;
      }[];
      capture_rate: number;
      __typename: string;
    };
    pokemonsprites: {
      sprites: string;
      __typename: string;
    }[];
    pokemontypes: {
      type: {
        typenames: {
          name: string;
          __typename: string;
        }[];
        __typename: string;
      };
      __typename: string;
    }[];
    weight: number;
    height: number;
    pokemonstats: {
      base_stat: number;
      stat: {
        name: string;
        __typename: string;
      };
      __typename: string;
    }[];
  }[];
}
