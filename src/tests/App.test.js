import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('tela de login', () => {
  it('teste se existe um campo para email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByLabelText(/Email:/);
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByLabelText(/Senha:/);
    expect(inputPassword).toBeInTheDocument();
  });
});
