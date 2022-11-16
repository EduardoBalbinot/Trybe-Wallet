import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

const valueInput = 'value-input';

describe('testa a tela da carteira', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('testa se o valor da despasa salva é somado no total', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValorDespesa = await screen.findByTestId(valueInput);
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

    await userEvent.type(inputValorDespesa, '1');
    await userEvent.click(btnAdicionarDespesa);
    const total = await screen.findByTestId('total-field');
    await waitFor(() => expect(total.innerHTML).toBe('4.75'));
    expect(total).toBeInTheDocument();

    const moedaDeConversao = await screen.findByText('Dólar Americano/Real Brasileiro');
    expect(moedaDeConversao).toBeInTheDocument();
    const moeda = screen.getByText('Real');
    expect(moeda).toBeInTheDocument();
  });

  it('teste se é possivel excluir uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValorDespesa = await screen.findByTestId(valueInput);
    const btnAdicionarDespesa = await screen.findByRole('button', { name: /Adicionar despesa/ });
    await userEvent.type(inputValorDespesa, '1');
    await userEvent.click(btnAdicionarDespesa);
    const btnExcluir = await screen.findByRole('button', { name: 'Excluir' });
    expect(btnExcluir).toBeInTheDocument();
    userEvent.click(btnExcluir);
    expect(btnExcluir).not.toBeInTheDocument();
  });

  it('testa se é possivel editar uma despsa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValorDespesa = await screen.findByTestId(valueInput);
    const btnAdicionarDespesa = await screen.findByRole('button', { name: /Adicionar despesa/ });
    await userEvent.type(inputValorDespesa, '1');
    await userEvent.click(btnAdicionarDespesa);
    const valorDespesa = await screen.findAllByText('4.75');
    expect(valorDespesa[1].innerHTML).toBe('4.75');
    const btnEditar = await screen.findByTestId('edit-btn');
    expect(btnEditar).toBeInTheDocument();
    await userEvent.click(btnEditar);
    const inputValorDespesa2 = await screen.findByTestId(valueInput);
    await userEvent.type(inputValorDespesa2, '2');
    const btnEditarDespesa = await screen.findByRole('button', { name: 'Editar despesa' });
    await userEvent.click(btnEditarDespesa);
    const valorDespesa2 = await screen.findAllByText('9.51');
    expect(valorDespesa2[1].innerHTML).toBe('9.51');
  });
});
