import React, { Component } from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <form onSubmit={this.onSubmit} className="mb-3">
        <div className="form-group">
          <input
            className="form-control col-md-5"
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="New Password"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control col-md-5 mt-4"
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm New Password"
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

export default PasswordChangeForm;