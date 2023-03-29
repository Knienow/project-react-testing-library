import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando se é renderizado um card com as informações de determinado Pokémon:', () => {
  const moreDetails = 'More details';
  const pokemonTest = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      weight: '6.0',
      measure: 'kg',
      image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    },
  ];

  it('testando se o card renderiza todas as informações do pokémon teste', () => {
    renderWithRouter(<App />);
    pokemonTest.forEach((data) => {
      const name = screen.getByTestId('pokemon-name');
      expect(name.innerHTML).toBe(data.name);
      const type = screen.getByTestId('pokemon-type');
      expect(type.innerHTML).toBe(data.type);
      const weight = screen.getByTestId('pokemon-weight');
      expect(weight.innerHTML).toBe(`Average weight: ${data.weight} ${data.measure}`);
      const image = screen.getByRole('img');
      expect(image.src).toBe(data.image);
      expect(image.alt).toBe(`${data.name} sprite`);
    });
  });

  it('A imagem de favorito possui o alt "<name> is marked as favorite" e o src /star-icon.svg', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favorite).toBeInTheDocument();
    const details = screen.getByRole('link', { name: moreDetails });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const isFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(isFavorite).toBeInTheDocument();
    userEvent.click(isFavorite);
    userEvent.click(home);
    const imageFavorite = screen.getByRole('img', { name: `${pokemonTest[0].name} is marked as favorite` });
    const srcIcon = imageFavorite.src.includes('/star-icon.svg');
    expect(srcIcon).toBeTruthy();
    expect(imageFavorite.alt).toBe(`${pokemonTest[0].name} is marked as favorite`);
  });

  it('É exibido na tela um link com o href /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: moreDetails });
    expect(details).toBeInTheDocument();
    const hasPath = details.href.includes(`/pokemon/${pokemonTest[0].id}`);
    expect(hasPath).toBeTruthy();

    userEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pokemonTest[0].id}`);

    const checkPage = screen.getByRole(
      'heading',
      { level: 2, name: 'Pikachu Details' },
    );
    expect(checkPage).toBeInTheDocument();
  });
});
