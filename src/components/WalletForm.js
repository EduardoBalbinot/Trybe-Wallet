import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies, isFetching } = this.props;
    if (isFetching) return (<p>Carregando...</p>);
    return (
      <div>
        <form>
          <label htmlFor="valorDespesa">
            { 'Valor da despesa: ' }
            <input
              data-testid="value-input"
              id="valorDespesa"
            />
          </label>
          <label htmlFor="descricaoDespesa">
            { 'Descrição da despesa: ' }
            <input
              data-testid="description-input"
              id="descricaoDespesa"
            />
          </label>
          <label htmlFor="moedaDespesa">
            { 'Moeda: ' }
            <select
              data-testid="currency-input"
              id="moedaDespesa"
            >
              { currencies.map((c, i) => <option key={ i }>{ c }</option>) }
            </select>
          </label>
          <label htmlFor="metodoPagamento">
            { 'Método de pagamento: ' }
            <select
              data-testid="method-input"
              id="metodoPagamento"
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
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps)(WalletForm);
