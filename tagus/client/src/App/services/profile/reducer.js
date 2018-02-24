import { constants } from '../constants';

export const profileReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.auth.LOGIN_FULFILLED: {
            if (action.payload.data.success) {
                newState.user = action.payload.data.user;
            }
            return newState;
        }
        case constants.auth.GET_LOGGED_USER_FULFILLED: {
            if (action.payload.data.user) {
                newState.user = action.payload.data.user;
            } 
            return newState;
        }
        default:
            return newState || {};
    }
}