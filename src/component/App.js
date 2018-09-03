import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import PasswordForgetPage from './PasswordForgetPage';
import HomePage from './HomePage';
import AccountPage from './AccountPage';
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Navigation />

          <main role="main" className="container">

            <div className="starter-template">
              <Route
                exact path={routes.LANDING}
                component={() => <LandingPage />}
              />
              <Route
                exact path={routes.SIGN_UP}
                component={() => <SignUpPage />}
              />
              <Route
                exact path={routes.SIGN_IN}
                component={() => <SignInPage />}
              />
              <Route
                exact path={routes.PASSWORD_FORGET}
                component={() => <PasswordForgetPage />}
              />
              <Route
                exact path={routes.HOME}
                component={() => <HomePage />}
              />
              <Route
                exact path={routes.ACCOUNT}
                component={() => <AccountPage />}
              />

            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
