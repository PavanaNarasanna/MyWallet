import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import LoginForm from '../../components/LoginForm';
import PropTypes from 'prop-types';

import backgroundImg from '../../stylesheets/images/wallet-icon.png';
import './LoginPage.css';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.dispatch(login(this.state, this.props.history));
    this.setState({ email: '', password: '' });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  redirectToDashboard() {
    this.props.history.push('/dashboard');
  }

  render() {
    // const loadingWrapper = classNames({
    //   '--loading': this.props.requesting,
    // });
    const renderForm = this.props.requesting ? (
      <p>Loading</p>
    ) : (
      <div className="loginPage__form__wrapper">
        <img className="wallet_background" src={backgroundImg} alt="" />
        <LoginForm
          email={this.state.email}
          password={this.state.password}
          onSubmit={e => this.onSubmit(e)}
          handleChange={this.handleChange}
        />
      </div>
    );

    return <div className={`LoginPage`}>{renderForm}</div>;
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func,
  message: PropTypes.string,
  history: PropTypes.object,
  disable: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    dispatch: PropTypes.func.isRequired,
    requesting: state.loginReducer.requesting,
  };
}

export default connect(mapStateToProps)(LoginPage);
