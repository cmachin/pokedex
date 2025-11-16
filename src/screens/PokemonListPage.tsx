import React from 'react';
import { tss } from '../tss';
import { useGetPokemons } from 'src/hooks/useGetPokemons';

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data } = useGetPokemons();

  return (
    <div className={classes.root}>
      <ul>{data?.map((d) => <li key={d.id}>{d.name}</li>)}</ul>
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
  },
}));
