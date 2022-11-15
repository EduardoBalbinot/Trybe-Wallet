import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('testa a tela da carteira', () => {
  it('testa se o valor da despasa salva é somado no total', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<Wallet />);
    const inputValorDespesa = await screen.findByTestId('value-input');
    expect(inputValorDespesa).toBeInTheDocument();
    const inputDescricaoDespesa = await screen.findByTestId('description-input');
    expect(inputDescricaoDespesa).toBeInTheDocument();
    const inputMoedaDespesa = await screen.findByTestId('currency-input');
    expect(inputMoedaDespesa).toBeInTheDocument();
    const inputMetodoDespesa = await screen.findByTestId('method-input');
    expect(inputMetodoDespesa).toBeInTheDocument();
    const inputCategoriaDespesa = await screen.findByTestId('tag-input');
    expect(inputCategoriaDespesa).toBeInTheDocument();
    const btnAdicionarDespesa = await screen.findByRole('button', { name: /Adicionar despesa/ });
    expect(btnAdicionarDespesa).toBeInTheDocument();

    userEvent.type(inputValorDespesa, '1');
    userEvent.click(btnAdicionarDespesa);

    const total = await screen.findByText('4.75');
    expect(total).toBeInTheDocument();
  });
});
