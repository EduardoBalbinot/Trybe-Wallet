import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    validated: false,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => { this.validateFields(); });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  validateFields = () => {
    const { email, password } = this.state;
    const passwordMinLength = 6;
    let validated = false;

    validated = password.length >= passwordMinLength
             && email.includes('@')
             && email.includes('.com');

    this.setState({
      validated,
    });
  };

  render() {
    const { validated, email, password } = this.state;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ this.handleChange }
          name="email"
          value={ email }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          disabled={ !validated }
          onClick={ this.handleClick }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
