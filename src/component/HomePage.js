import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers()
      .then(snapshot =>
        onSetUsers(snapshot.val())
      );
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        {users &&
          <ul>
            {
              Object.keys(users).map((id) =>
                <li key={id}>
                  {users[id].username} [{users[id].email}]
                </li>
              )}
          </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.usersState.users,
})

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
})

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);