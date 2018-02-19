import {constants} from '../constants';
import {convertArrayToDictionary} from '../helpers';

export const usersReducer = function(state, action) {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.users.GET_USERS_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.users.GET_USERS_LIST_FULFILLED: {
            newState.fetchingList = true;
            newState.list = action.payload.data.list;
            newState.dictionary = convertArrayToDictionary(newState.list);
            return newState;
        }
        case constants.users.GET_USER_DETAIL_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }
        case constants.users.GET_USER_DETAIL_FULFILLED: {
            newState.fetchingDetail = false;
            newState.detail = action.payload.data;
            return newState;
        }
        default: {
            return newState || {};
        }
    }
}