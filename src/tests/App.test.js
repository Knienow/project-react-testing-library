import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// it('deve renderizar o componente App', () => {
//   renderWithRouter(<App />);

// const homeTitle = screen.getByRole('heading', {
//   name: 'Você está na página Início',
// });
// expect(homeTitle).toBeInTheDocument();

it('deve renderizar o componente Home', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

it('deve renderizar o componente About', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  // const aboutTitle = screen.getByRole(
  //   'heading',
  //   { name: 'Você está na página Sobre' },
  // );
  // expect(aboutTitle).toBeInTheDocument();
});

it('deve renderizar o componente Favorite Pokémon', () => {
  const { history } = renderWithRouter(<App />);

  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
  expect(favoriteLink).toBeInTheDocument();
  userEvent.click(favoriteLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

it('deve testar um caminho não existente e a renderização do Not Found', () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/pagina/que-nao-existe/');
  });

  const notFoundTitle = screen.getByRole(
    'heading',
    { name: 'Page requested not found' },
  );
  expect(notFoundTitle).toBeInTheDocument();
});
