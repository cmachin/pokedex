import React, { useEffect, useState } from 'react';
import { tss } from '../tss';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import { Card, Flex, Spin, Tag, Input, Empty, Image, Button, Result } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Pokemon } from 'src/types/pokemon.types';
import { getTagColor } from 'src/utils/pokemon.utils';

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data, loading, error } = useGetPokemons();
  const [pokemonList, setPokemonList] = useState<Pokemon[] | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  /* Set list of pokemon but only on initial load to not trigger infinite re-renders */
  useEffect(() => {
    if (data && !loading && !error && !pokemonList) setPokemonList(data);
  }, [data, loading, error, pokemonList]);

  /* Client-Side search */
  const handleSearchSubmit = (value: string) => {
    if (!value) {
      setSearchTerm('');
      setPokemonList(data);
      return;
    }
    setPokemonList(
      data.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  };

  /* Display spinner if data is loading or if pokemon list has not been populated */
  if (loading || (data && !pokemonList))
    return (
      <Flex className={classes.root} justify="center" align="center" style={{ height: '80vh' }}>
        <Spin tip="Fetching Pokédex..." size="large">
          <div />
        </Spin>
      </Flex>
    );

  /* Display an error state if an error occurs */
  if (error)
    return (
      <Flex className={classes.root} justify="center" align="center" style={{ height: '80vh' }}>
        <Result
          status="error"
          title="Looks like something went wrong!"
          subTitle="Team Rocket might be behind it... Try refreshing the page"
          extra={
            <Button type="primary" key="reload" onClick={() => window.location.reload()}>
              Reload
            </Button>
          }
        />
      </Flex>
    );

  /* Display pokedex */
  return (
    <Flex className={classes.root} gap="large" vertical align="center">
      <h1>Pokédex</h1>
      <Input.Search
        placeholder="Search for a Pokémon"
        allowClear
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearchSubmit}
      />
      <Flex wrap="wrap" gap="middle" justify="center">
        {!pokemonList?.length ? (
          <Empty description>
            <p>No Pokémon found.</p>
          </Empty>
        ) : (
          pokemonList?.map((pokemon) => (
            <Card
              key={pokemon.id}
              hoverable
              size="small"
              bordered={false}
              title={String(pokemon.id).padStart(3, '0')}
              cover={<Image src={pokemon.sprite} preview={false} />}
              onClick={() => navigate(`/list/${pokemon.id}`)}
            >
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0' }}>{pokemon.name}</h2>
                <Flex wrap="wrap" gap="small">
                  {pokemon.types?.map((type) => (
                    <Tag key={type} color={getTagColor(type)}>
                      <strong>{type ?? 'Unknown'}</strong>
                    </Tag>
                  ))}
                </Flex>
              </div>
            </Card>
          ))
        )}
      </Flex>
      <Outlet />
    </Flex>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
    width: '100%',
    h1: {
      margin: 0,
    },
    '.ant-input-group-wrapper': {
      width: '20rem',
      maxWidth: '80%',
    },
    '.ant-input-group-wrapper input::placeholder': {
      color: 'gray',
    },
    '.ant-spin-nested-loading': {
      width: '10rem',
    },
    '.ant-spin-text': {
      marginTop: '1rem',
      textShadow: 'unset !important',
    },
    '.ant-card': {
      background: theme.color.card.background,
      color: theme.color.card.foreground,
      borderWidth: '0.1rem',
      borderStyle: 'solid',
      borderColor: theme.color.card.background,
    },
    '.ant-card-head': {
      color: theme.color.card.foreground,
      borderColor: theme.color.card.accent,
      background: theme.color.card.accent,
    },
    '.ant-card:hover': {
      borderColor: '#415d7aff',
      boxShadow: '0 0 0.2rem 0.2rem #51667dff',
    },
    '.ant-card img': {
      maxHeight: '10rem',
      padding: '1rem',
      margin: 'auto',
    },
    '.ant-result-title': {
      color: theme.color.text.primary,
    },
    '.ant-result-subtitle': {
      color: theme.color.text.secondary,
    },
  },
}));
