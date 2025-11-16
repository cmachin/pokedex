import React from 'react';
import { act, render } from 'src/test-utils';
import { PokemonListPage } from './PokemonListPage';
import { useNavigate } from 'react-router-dom';

jest.mock('src/hooks/useGetPokemons', () => ({
  useGetPokemons: jest.fn().mockReturnValue({
    data: [
      { id: '1', name: 'Bulbasaur' },
      { id: '4', name: 'Charmander' },
    ],
  }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PokemonListPage', () => {
  test('it renders', () => {
    const { getByText } = render(<PokemonListPage />);
    getByText('Bulbasaur');
  });
  test('clicking on a pokemon calls navigate', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const { getByText, user } = render(<PokemonListPage />);

    await act(async () => {
      await user.click(getByText('Bulbasaur'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/list/1');
  });
  test('typing in the search bar filters the results', async () => {
    const { getByPlaceholderText, queryByText, user } = render(<PokemonListPage />);
    const searchInput = getByPlaceholderText('Search for a Pokémon');

    // Initially all pokemon are present
    expect(queryByText('Bulbasaur')).toBeInTheDocument();
    expect(queryByText('Charmander')).toBeInTheDocument();

    // Search for Charmander
    await act(async () => {
      await user.type(searchInput, 'Charmander');
      await user.keyboard('{Enter}');
    });

    // Only Charmander should be present
    expect(queryByText('Charmander')).toBeInTheDocument();
    expect(queryByText('Bulbasaur')).not.toBeInTheDocument();

    // Clear the search input
    await act(async () => {
      await user.clear(searchInput);
      await user.keyboard('{Enter}');
    });

    // Bulbasaur should be present again
    expect(queryByText('Bulbasaur')).toBeInTheDocument();
  });
});
