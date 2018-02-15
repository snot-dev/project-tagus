import {constants} from '../constants';

export const translatesReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.translates.GET_TRANSLATES_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.translates.GET_TRANSLATES_LIST_FULFILLED: {
            newState.list = action.payload.data.translates;
            newState.fetchingList = false;
            return newState;
        }
        default: {
            return state || {};
        }
    }
}