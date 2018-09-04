import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';

import * as routes from '../constants/routes';
import { auth, db } from '../firebase';

const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp Page</h1>
    <SignUpForm history={history} />
  </div>;

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;
    console.log('onSubmit');
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db.doCreateUser({ ...authUser.user, ...{ displayName: username, provider: "email" } })
          .then(() => {
            console.log('OK');
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            console.log(error);
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        console.log(error);
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            className="form-control col-md-5 mt-4"
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control col-md-5"
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control col-md-5"
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control col-md-5"
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isInvalid}
          className="btn btn-sm btn-success my-2 my-sm-0">
          Sign Up
        </button>

        {error && <div className="alert alert-danger mb-3 mt-3" role="alert">{error.message}</div>}
      </form >
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account ?
      {' '}
    <Link to={routes.SIGN_UP}>Sign up</Link>
  </p>;

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
}