import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('tela de login', () => {
  it('testa se existe um campo para email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  });
  it('testa se existe um campo para senha', () => {
    renderWithRouterAndRedux(<App />);
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });
  it('testa se o usuario é redirecionado para a pagina da carteira', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    const email = '914@thepro@gmail.com';
    const senha = '1234356';
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, senha);
    userEvent.click(button);
    expect(inputEmail).not.toBeInTheDocument();
    expect(inputPassword).not.toBeInTheDocument();
  });
});
