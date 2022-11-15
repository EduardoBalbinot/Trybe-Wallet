import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.length === 0
              ? <tr />
              : (
                expenses.map((e, i) => {
                  const nomeDaMoeda = e.exchangeRates[e.currency].name;
                  const cambio = Number(e.exchangeRates[e.currency].ask);
                  return (
                    <tr key={ i }>
                      <td>{ e.description }</td>
                      <td>{ e.tag }</td>
                      <td>{ e.method }</td>
                      <td>{ Number(e.value).toFixed(2) }</td>
                      <td>Real</td>
                      <td>{ cambio.toFixed(2) }</td>
                      <td>{ (e.value * cambio).toFixed(2) }</td>
                      <td>{ nomeDaMoeda }</td>
                    </tr>
                  );
                })
              )
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
