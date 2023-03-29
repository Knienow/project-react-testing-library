import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';
const checkboxLabel = 'Pokémon favoritado?';
// const pokemonTest = [
//   {
//     id: 25,
//     name: 'Pikachu',
//     type: 'Electric',
//     weight: '6.0',
//     measure: 'kg',
//     image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
//   },
// ];
// const PATH = `/pokemon/${pokemonTest[0].id}`;
const PATH = '/pokemon/25';

describe('Testando os elementos do componente PokemonDetails.js', () => {
  it('Deve exibir um h2 com o texto "<name> Details"', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: moreDetails });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const titleDetails = screen.getByRole(
      'heading',
      // { level: 2, name: `${pokemonTest[0].name} Details` },
      { level: 2, name: 'Pikachu Details' },
    );
    expect(titleDetails).toBeInTheDocument();
  });

  it('Deve exibir um h2 com o texto "Summary" e um texto contendo <summary>', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(PATH);
    });
    const titleSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(titleSummary).toBeInTheDocument();
    const summaryText = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(summaryText).toBeInTheDocument();
  });

  it('Deve exibir um h2 com o texto "Game Locations of <name>" e as imagens de localização com o src correto', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(PATH);
    });
    const pokemonLocation = [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ];
    // const tittleLocation = screen.getByRole('heading', { level: 2, name: `Game Locations of ${pokemonTest[0].name}` });
    const tittleLocation = screen.getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    expect(tittleLocation).toBeInTheDocument();
    const imgLocation = screen.queryAllByRole(
      'img',
      { name: /location/i },
    );
    expect(imgLocation).toHaveLength(2);
    pokemonLocation.forEach((map, index) => {
      expect(imgLocation[index].src).toBe(map.map);
    });
  });

  it('Deve exibir na tela uma label com o texto Pokémon favoritado?', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(PATH);
    });
    const isFavorite = screen.getByLabelText(checkboxLabel, { selector: 'input' });
    expect(isFavorite).toBeInTheDocument();
    userEvent.click(isFavorite);
    expect(isFavorite.checked).toBeTruthy();
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favoritePokemonsLink).toBeInTheDocument();
    userEvent.click(favoritePokemonsLink);
  });
});
