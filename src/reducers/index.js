import { combineReducers } from 'redux';
import sessionReducer from './session';
import usersReducer from './user';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    usersState: usersReducer,
});

export default rootReducer;