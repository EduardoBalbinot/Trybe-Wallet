import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p>
          { 'Despesa Total: '}
          <span data-testid="total-field" id="total-field">0</span>
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
