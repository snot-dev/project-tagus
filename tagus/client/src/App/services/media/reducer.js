import { constants } from '../constants';

export const mediaReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case constants.media.GET_MEDIA_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.media.GET_MEDIA_FULFILLED: {
            newState.fetchingList = false;
            if (action.payload.data.list) {
                newState.list = action.payload.data.list
            }

            return newState;
        }
        default: 
            return newState || {};
    }
}