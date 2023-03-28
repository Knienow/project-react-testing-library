import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import FavoritePokemon from '../pages/FavoritePokemon';

describe('Ao favoritar a partir da página de detalhes, verificar se', () => {
  it('é exibida na tela a mensagem "No favorite pokemon found" caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<App />);

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favorites);
    const noFavoritePokemonMessage = screen.getByText('No favorite Pokémon found');
    expect(noFavoritePokemonMessage).toBeInTheDocument();
  });
  it('se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokemonDetails);
    const detailsCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(detailsCheckbox);
    const pageFavorites = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(pageFavorites);
    const image = screen.getByAltText(/is marked as favorite/i);
    expect(image).toBeInTheDocument();
  });
});
