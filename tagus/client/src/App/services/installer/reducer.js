import { constants } from '../constants';

export const installerReducer = (state, action) => { 
    const newState = Object.assign({}, state);

    switch (action.type) {
        case constants.installer.GET_INFO_PENDING: {
            newState.checkingInfo = true;
            return newState;
        }
        case constants.installer.GET_INFO_FULFILLED: {
            newState.checkingInfo = false;
            newState.checkedInfo = true;
            newState.shouldInstall = action.payload.data;
            return newState;
        }
        default:
            return newState || {};
    }
}