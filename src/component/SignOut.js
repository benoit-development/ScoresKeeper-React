import React from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const SignOutLink = ({history, className }) => 
    <button
        type="button"
        className={className}
        onClick={() =>
            auth.doSignOut()
                .then(() => {
                    history.push(routes.HOME);
                })
        }
    >
        <i className="fa fa-sign-out-alt mr-2" aria-hidden="true"></i>Sign Out
    </button>;

export default withRouter(SignOutLink);