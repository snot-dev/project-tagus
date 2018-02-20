import { constants } from '../constants';

export const authReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case constants.auth.LOGIN_PENDING: {
            newState.loggingIn = true;
            return newState;
        }
        case constants.auth.LOGIN_FULFILLED: {
            newState.loggingIn = false;
            if (action.payload.data.error) {
                newState.result = action.payload.data;
            }
            else if (action.payload.data.success) {
                newState.loggedIn = true;
                newState.user = action.payload.data.user;
                localStorage.setItem('user', JSON.stringify(action.payload.data.token));
            }

            return newState;
        }
        case constants.auth.LOGOFF: {
            newState.loggedIn = false;
            newState.user = {};
            localStorage.removeItem('user');
            return newState;
        }
        default: 
            return newState || {};
    }
}