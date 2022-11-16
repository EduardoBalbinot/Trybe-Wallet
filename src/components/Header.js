import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';
import trybeWalletLogo from '../images/TrybeWalletLogo.png';
import totalLogo from '../images/totalLogo.png';
import userImage from '../images/userImage.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses
      .reduce((acc, curr) => acc
      + (Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask)), 0);
    return (
      <div className="headerMainDiv">
        <div>
          <img src={ trybeWalletLogo } alt="trybe wallet logo" className="tbLogo" />
        </div>
        <div>
          <img src={ totalLogo } alt="Icone de moedas" className="totalLogo" />
          <p className="despesaTotal">
            { 'Despesa Total: '}
            <span data-testid="total-field" id="total-field">{ total.toFixed(2) }</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
        <div>
          <img src={ userImage } alt="Imagem do usuario" className="totalLogo" />
          <p data-testid="email-field" className="email">{ email }</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
