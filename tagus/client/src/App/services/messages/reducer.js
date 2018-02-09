import { constants } from '../constants';

const createMessage = (type, object) => {
    return {
        type,
        subject: object.subject,
        verb: object.verb,

    };
}

export const messagesReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.messages.DELETE_MESSAGE: {
            newState.list.splice(action.payload, 1);
            return newState;
        }
        case constants.content.POST_CONTENT_DETAIL_FULFILLED: {
            newState.list.push({
                type: 'success',
                subject: action.payload.data.result.name,
                verb: 'was updated',
                result: 'with success'
            });

            return newState;
        }
        default: {
            return state || {};
        }
    }
}