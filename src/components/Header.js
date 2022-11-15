import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses
      .reduce((acc, curr) => acc
      + (Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask)), 0);
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p>
          { 'Despesa Total: '}
          <span data-testid="total-field" id="total-field">{ total.toFixed(2) }</span>
        </p>
        <p>
          { 'Câmbio: ' }
          <span data-testid="header-currency-field">BRL</span>
        </p>
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
