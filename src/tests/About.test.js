import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Verifica se a página About contém', () => {
  it('informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/Pokémon/i);
    expect(paragraphs).toHaveLength(2);
  });
  it('um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole(
      'heading',
      { level: 2, name: 'About Pokédex' },
    );
    expect(aboutTitle).toBeInTheDocument();
  });

  it('a imagem de uma Pokédex correspondente a https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
