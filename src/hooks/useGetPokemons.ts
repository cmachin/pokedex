import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { GetPokemonsResponse } from 'src/schemas/gql.schema';
import { Pokemon } from 'src/types/pokemon.types';

export const GET_POKEMONS = gql`
  query GetPokemons($search: String) {
    pokemon(
      limit: 151
      order_by: { id: asc }
      where: {
        pokemonspecy: {
          pokemonspeciesnames: { language: { name: { _eq: "en" } }, name: { _regex: $search } }
        }
      }
    ) {
      id
      pokemonspecy {
        pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }) {
          name
        }
      }
      pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemontypes {
        type {
          typenames(where: { language: { name: { _eq: "en" } } }) {
            name
          }
        }
      }
    }
  }
`;

// Search should be done client-side for the mid-level assessment. Uncomment for the senior assessment.
export const useGetPokemons = (/* search?: string */): {
  data: Pokemon[];
  loading: boolean;
  error: useQuery.Result['error'];
} => {
  const { data, loading, error } = useQuery<GetPokemonsResponse>(GET_POKEMONS, {
    variables: {
      search: '', // `.*${search}.*`,
    },
  });
  return {
    data:
      data?.pokemon?.map(
        (p): Pokemon => ({
          id: p.id,
          name: p.pokemonspecy.pokemonspeciesnames?.[0]?.name,
          sprite: p.pokemonsprites?.[0]?.sprites,
          types: p.pokemontypes?.map((t: any) => t.type.typenames?.[0]?.name),
        }),
      ) ?? [],
    loading,
    error,
  };
};
