import { constants } from '../constants';

export const bridgesReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.bridges.GET_BRIDGES_LIST_PENDING:
            newState.fetchingList = true;
            return newState;
        case constants.bridges.GET_BRIDGES_LIST_FULFILLED:
            newState.fetchingList = false;
            newState.list = action.payload.data;
            return newState;
        default:
            return state || {}; 
    }
}