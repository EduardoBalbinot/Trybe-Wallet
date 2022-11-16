import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchCurrencies, saveExpense, updateExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valorDespesa: '',
    descricaoDespesa: '',
    moedaDespesa: 'USD',
    metodoPagamentoDespesa: 'Dinheiro',
    categoriaDespesa: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  adicionarDespesa = () => {
    const { dispatch, expenseIndex } = this.props;
    const {
      valorDespesa,
      descricaoDespesa,
      moedaDespesa,
      metodoPagamentoDespesa,
      categoriaDespesa,
    } = this.state;

    const novaDespesa = {
      id: expenseIndex,
      value: valorDespesa,
      description: descricaoDespesa,
      currency: moedaDespesa,
      method: metodoPagamentoDespesa,
      tag: categoriaDespesa,
    };
    dispatch(saveExpense(novaDespesa));

    this.setState({
      valorDespesa: '',
      descricaoDespesa: '',
      moedaDespesa: 'USD',
      metodoPagamentoDespesa: 'Dinheiro',
      categoriaDespesa: 'Alimentação',
    });
  };

  editarDespesa = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const {
      valorDespesa,
      descricaoDespesa,
      moedaDespesa,
      metodoPagamentoDespesa,
      categoriaDespesa,
    } = this.state;
    const expenseToEdit = expenses.find((e) => e.id === idToEdit);
    expenseToEdit.value = valorDespesa;
    expenseToEdit.description = descricaoDespesa;
    expenseToEdit.currency = moedaDespesa;
    expenseToEdit.method = metodoPagamentoDespesa;
    expenseToEdit.tag = categoriaDespesa;
    dispatch(updateExpenses(expenses));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies, isFetching, isSaving, editor } = this.props;
    const {
      valorDespesa,
      descricaoDespesa,
      moedaDespesa,
      metodoPagamentoDespesa,
      categoriaDespesa,
    } = this.state;
    if (isFetching) return (<p>CARREGANDO...</p>);
    if (isSaving) return (<p>SALVANDO...</p>);
    return (
      <div>
        <form>
          <label htmlFor="valorDespesa">
            { 'Valor da despesa: ' }
            <input
              data-testid="value-input"
              id="valorDespesa"
              name="valorDespesa"
              value={ valorDespesa }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricaoDespesa">
            { 'Descrição da despesa: ' }
            <input
              data-testid="description-input"
              id="descricaoDespesa"
              name="descricaoDespesa"
              value={ descricaoDespesa }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moedaDespesa">
            { 'Moeda: ' }
            <select
              data-testid="currency-input"
              id="moedaDespesa"
              name="moedaDespesa"
              value={ moedaDespesa }
              onChange={ this.handleChange }
            >
              { currencies.map((c, i) => <option key={ i }>{ c }</option>) }
            </select>
          </label>
          <label htmlFor="metodoPagamento">
            { 'Método de pagamento: ' }
            <select
              data-testid="method-input"
              id="metodoPagamento"
              name="metodoPagamentoDespesa"
              value={ metodoPagamentoDespesa }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoriaDespesa">
            { 'Categoria: ' }
            <select
              data-testid="tag-input"
              id="categoriaDespesa"
              name="categoriaDespesa"
              value={ categoriaDespesa }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ editor ? this.editarDespesa : this.adicionarDespesa }
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenseIndex: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseIndex: state.wallet.expenseIndex,
  expenses: state.wallet.expenses,
  isFetching: state.wallet.isFetching,
  isSaving: state.wallet.isSaving,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
