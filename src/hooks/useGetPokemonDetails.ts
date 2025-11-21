import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { GetPokemonDetailsResponse } from 'src/schemas/gql.schema';
import { PokemonDetail } from 'src/types/pokemon.types';

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon(where: { id: { _eq: $id } }) {
      id
      pokemonspecy {
        pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }) {
          name
        }
        capture_rate
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
      weight
      height
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`;

export const useGetPokemonDetails = (
  id: number,
): {
  data: PokemonDetail;
  loading: boolean;
  error: useQuery.Result['error'];
} => {
  const { data, loading, error } = useQuery<GetPokemonDetailsResponse>(GET_POKEMON_DETAILS, {
    variables: {
      id,
    },
  });
  return {
    data: {
      id: data?.pokemon?.[0]?.id ?? -1,
      name: data?.pokemon?.[0]?.pokemonspecy.pokemonspeciesnames?.[0]?.name ?? '',
      sprite: data?.pokemon?.[0]?.pokemonsprites?.[0]?.sprites,
      types: data?.pokemon?.[0]?.pokemontypes?.map((t: any) => t.type.typenames?.[0]?.name),
      capture_rate: data?.pokemon?.[0]?.pokemonspecy.capture_rate ?? -1,
      weight: data?.pokemon?.[0]?.weight ?? -1,
      height: data?.pokemon?.[0]?.height ?? -1,
      base_stats: {
        hp: data?.pokemon?.[0]?.pokemonstats.find((s) => s.stat.name === 'hp')?.base_stat ?? -1,
        attack:
          data?.pokemon?.[0]?.pokemonstats.find((s) => s.stat.name === 'attack')?.base_stat ?? -1,
        defense:
          data?.pokemon?.[0]?.pokemonstats.find((s) => s.stat.name === 'defense')?.base_stat ?? -1,
        sp_atk:
          data?.pokemon?.[0]?.pokemonstats.find((s) => s.stat.name === 'special-attack')
            ?.base_stat ?? -1,
        sp_def:
          data?.pokemon?.[0]?.pokemonstats.find((s) => s.stat.name === 'special-defense')
            ?.base_stat ?? -1,
        speed:
          data?.pokemon?.[0]?.pokemonstats.find((s) => s.stat.name === 'speed')?.base_stat ?? -1,
        total:
          data?.pokemon?.[0]?.pokemonstats.reduce((acc, curr) => acc + curr.base_stat, 0) ?? -1,
      },
    },
    loading,
    error,
  };
};
