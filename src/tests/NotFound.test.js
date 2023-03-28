import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

test('A página deve ter um heading h2 com o texto "Page requested not found"', () => {
  renderWithRouter(<NotFound />);
  const notFoundMessage = screen.getByText('Page requested not found');
  expect(notFoundMessage).toBeInTheDocument();
});

test('A página deve mostrar a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);
  const image = screen.getByAltText('Pikachu crying because the page requested was not found');
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
