import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization.js';
import { PasswordForgetForm } from './PasswordForgetPage';
import PasswordChangeForm from './PasswordChange';

const AccountPage = ({ authUser }) => {

  // check account type
  let isPasswordProvider = false;
  authUser.providerData.forEach((item) => {
    isPasswordProvider |= (item.providerId === "password");
  });
  console.log(authUser.providerData);
  const displayName = !!authUser.displayName ? authUser.displayName : authUser.email;

  return <div>
    <h1>Account</h1>
    <div className="card mt-4">
      <h5 className="card-header"><i className="fas fa-user rounded-circle" style={{ backgroundColor: "#0287ea", padding: "0.4em", color: "white" }}></i> Account</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><i className="far fa-id-card"></i> {displayName}</li>
        <li className="list-group-item"><i className="far fa-envelope"></i> {authUser.email}</li>
        {
          authUser.providerData.map((provider) =>
            <li className="list-group-item" key=""><i className="fas fa-shield-alt"></i> {getProviderLabel(provider.providerId)}</li>
          )
        }
      </ul>
    </div>
    {
      isPasswordProvider
        ?
        <div className="card mt-4">
          <h5 className="card-header"><i className="fas fa-key rounded-circle" style={{ backgroundColor: "#f77b20", padding: "0.4em", color: "white" }}></i> Reset Password</h5>
          <div className="card-body">
            <PasswordChangeForm />
            <PasswordForgetForm />
          </div>
        </div>
        : null
    }
  </div>
};

const getProviderLabel= (providerId) => {
  switch (providerId) {
    case "google.com":
      return "Google"
      break;
  
    default:
      return "Firebase"
      break;
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);