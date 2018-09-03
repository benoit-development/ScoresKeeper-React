import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import SignOutLink from './SignOut';

const Navigation = ({ authUser }) =>
  <div>
    {
      authUser
        ? NavigationAuth(authUser)
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = (authUser) =>
  <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">

    <img src="/images/trophy.png" alt="" className="rounded-circle" width="40" height="40" ></img>
    &nbsp;&nbsp;
    <Link to={routes.LANDING} className="navbar-brand" href="/">ScoresKeeper</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item"><Link to={routes.HOME} className="nav-link">Home</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right mr-5">
        <li className="nav-item">
          <img src={!!authUser.photoURL?authUser.photoURL:"/images/no-user.png"} alt="" className="rounded-circle" width="40" height="40" ></img></li>
        <li className="nav-item dropdown">
          <Link to={routes.ACCOUNT} className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {!!authUser.displayName?authUser.displayName:authUser.email}
          </Link>
          <div className="dropdown-menu">
            <Link to={routes.ACCOUNT} className="dropdown-item">
              <i className="fa fa-user mr-2" aria-hidden="true"></i>Account
            </Link>
            <div className="dropdown-divider"></div>
            <SignOutLink className="dropdown-item btn btn-link" />
          </div>
        </li>
      </ul>
    </div>
  </nav>

const NavigationNonAuth = () =>
  <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">

    <img src="/images/trophy.png" alt="" className="rounded-circle" width="40" height="40" ></img>
    &nbsp;&nbsp;
    <Link to={routes.LANDING} className="navbar-brand" href="/">ScoresKeeper</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul className="navbar-nav mr-auto">
        <li><Link to={routes.SIGN_IN} className="nav-link">Sign In</Link></li>
      </ul>
    </div>
  </nav>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Navigation);