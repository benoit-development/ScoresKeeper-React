import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';

const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit} className="mb-3">
        <div className="form-group">
          <input
            className="form-control col-md-5 mt-4"
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="email"
            placeholder="Email Address"
          />
        </div>
        <button disabled={isInvalid} type="submit"
          className="btn btn-sm btn-warning my-2 my-sm-0">
          Reset My Password
        </button>

        {error && <div className="alert alert-danger mb-3 mt-3" role="alert">{error.message}</div>}
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};