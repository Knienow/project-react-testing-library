import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../pages/Pokedex';
import App from '../App';

describe('Testando o componente Pokedex', () => {
  const nameNextButton = 'Próximo Pokémon';

  it('A página deve ter um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole(
      'heading',
      { level: 2, name: 'Encountered Pokémon' },
    );
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const pokedexButton = screen.getByRole('button', { name: nameNextButton });
    userEvent.click(pokedexButton);
  });

  it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;', () => {
    renderWithRouter(<App />);
    const pokemonList = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];
    pokemonList.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName.innerHTML).toBe(pokemon);
      const nextButton = screen.getByRole('button', { name: nameNextButton });
      userEvent.click(nextButton);
    });
  });

  it('verifica se há um botão All na página e se, ao ser clicado, são mostrados todos os tipos de Pokémon', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
    const nextButton = screen.getByRole('button', { name: nameNextButton });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.disabled).toBeTruthy();
    userEvent.click(buttonAll);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.disabled).toBeFalsy();
    userEvent.click(nextButton);
    const pokemonCharmander = screen.getByTestId('pokemon-name');
    expect(pokemonCharmander.innerHTML).toBe('Charmander');
  });

  it('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    // const allPokemon = screen.getByRole('button', { name: 'All' });
    // expect(allPokemon).toBeInTheDocument();
    const electric = screen.getByRole('button', { name: 'Electric' });
    expect(electric).toBeInTheDocument();
    const fire = screen.getByRole('button', { name: 'Fire' });
    expect(fire).toBeInTheDocument();
    const bug = screen.getByRole('button', { name: 'Bug' });
    expect(bug).toBeInTheDocument();
    const poison = screen.getByRole('button', { name: 'Poison' });
    expect(poison).toBeInTheDocument();
    const psychic = screen.getByRole('button', { name: 'Psychic' });
    expect(psychic).toBeInTheDocument();
    const normal = screen.getByRole('button', { name: 'Normal' });
    expect(normal).toBeInTheDocument();
    const dragon = screen.getByRole('button', { name: 'Dragon' });
    expect(dragon).toBeInTheDocument();
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const buttonsId = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsId.length).toBe(7);
  });

  it('Deve ser mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    let pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: nameNextButton });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    pokemon = screen.getByText('Charmander');
    const previousPokemon = screen.queryByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
    expect(previousPokemon).not.toBeInTheDocument();
  });
});
