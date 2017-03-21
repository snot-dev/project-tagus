import { constants } from '../../constants';

export let unitFieldsReducer = function(state, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case constants.unitFields.GET_UNITFIELDS_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.unitFields.GET_UNITFIELDS_LIST_FULFILLED: {
            newState.fetchingList = false;
            newState.list = action.payload.data;
            return newState;
        }

        default:
            return state || {};
    }
};