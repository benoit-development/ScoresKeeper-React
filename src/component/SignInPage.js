import React, { Component } from 'react';
import { SignUpLink } from './SignUpPage';
import { auth, db } from '../firebase';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import { PasswordForgetLink } from './PasswordForgetPage';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn Page</h1>
    <SignInForm history={history} />
    <SignUpLink />
    <PasswordForgetLink />
  </div>;

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  googleAuth = () => {

    const {
      history,
    } = this.props;

    auth.doSignInWithGoogleAccount()
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  facebookAuth = () => {

    const {
      history,
    } = this.props;

    auth.doSignInWithFacebookAccount()
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  twitterAuth = () => {

    const {
      history,
    } = this.props;

    auth.doSignInWithTwitterAccount()
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div>
        <button
          type="button"
          className="btn btn-danger btn-mg mt-3 mr-3"
          onClick={() => this.googleAuth()}>
          <i className="fab fa-google"></i> - Google
        </button>
        <button
          type="button"
          className="btn btn-primary btn-mg mt-3 mr-3"
          onClick={() => this.facebookAuth()}>
          <i className="fab fa-facebook"></i> - Facebook
        </button>
        <button
          type="button"
          className="btn btn-info btn-mg mt-3"
          onClick={() => this.twitterAuth()}>
          <i className="fab fa-twitter"></i> - Twitter
        </button>
        <form onSubmit={this.onSubmit} className="mb-3">
          <div className="form-group">
            <input
              className="form-control col-md-5 mt-4"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control col-md-5"
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            disabled={isInvalid}
            type="submit"
            className="btn btn-sm btn-success my-2 my-sm-0">
            Sign In
          </button>

          {error && <div className="alert alert-danger mb-3 mt-3" role="alert">{error.message}</div>}
        </form>
      </div>
    );

  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};