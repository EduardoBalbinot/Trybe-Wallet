import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpenses, startEditing } from '../redux/actions';
import './Table.css';
import imgExcluir from '../images/excluir.png';
import imgEditar from '../images/editar.png';

class Table extends Component {
  delete = (id) => {
    const { expenses, dispatch } = this.props;
    const updatedExpenses = expenses.filter((e) => e.id !== id);
    dispatch(updateExpenses(updatedExpenses));
  };

  ativarFormularioDeEdicao = (idToEdit) => {
    const { dispatch } = this.props;
    dispatch(startEditing(idToEdit));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="tableDiv">
        <table className="table">
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
                  expenses.map((e) => {
                    const nomeDaMoeda = e.exchangeRates[e.currency].name;
                    const cambio = Number(e.exchangeRates[e.currency].ask);
                    return (
                      <tr key={ e.id }>
                        <td>{ e.description }</td>
                        <td>{ e.tag }</td>
                        <td>{ e.method }</td>
                        <td>{ Number(e.value).toFixed(2) }</td>
                        <td>Real</td>
                        <td>{ cambio.toFixed(2) }</td>
                        <td>{ (e.value * cambio).toFixed(2) }</td>
                        <td>{ nomeDaMoeda }</td>
                        <td>
                          <button
                            data-testid="edit-btn"
                            type="button"
                            onClick={ () => { this.ativarFormularioDeEdicao(e.id); } }
                          >
                            <img src={ imgEditar } alt="Editar" />
                          </button>
                          <button
                            data-testid="delete-btn"
                            type="button"
                            onClick={ () => { this.delete(e.id); } }
                          >
                            <img src={ imgExcluir } alt="Excluir" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
