import { constants } from '../constants';

export const messagesReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.messages.DELETE_MESSAGE: {
            if (action.payload || action.payload === 0) {
                newState.list.splice(action.payload, 1);
            } 
            else {
                newState.list.shift();
            }
            
            return newState;
        }
        case constants.content.GET_CONTENT_LIST_FULFILLED:
        case constants.content.GET_CONTENT_UNITS_LIST_FULFILLED:
        case constants.content.GET_CONTENT_UNITS_LIST_REJECTED:
        case constants.content.GET_CONTENT_DETAIL_REJECTED:
        case constants.content.GET_CONTENT_DETAIL_UNITTYPE_REJECTED:
        case constants.content.POST_CONTENT_DETAIL_REJECTED:
        case constants.content.CREATE_CONTENT_REJECTED:
        case constants.content.DELETE_CONTENT_REJECTED:
        case constants.bridges.GET_BRIDGES_LIST_FULFILLED:
        case constants.bridges.GET_BRIDGES_UNITS_LIST_FULFILLED:
        case constants.bridges.GET_BRIDGES_LIST_REJECTED:
        case constants.bridges.GET_BRIDGES_UNITS_LIST_REJECTED:
        case constants.bridges.GET_BRIDGES_DETAIL_REJECTED:
        case constants.bridges.POST_BRIDGES_DETAIL_REJECTED:
        case constants.bridges.CREATE_BRIDGE_REJECTED:
        case constants.units.GET_UNITS_LIST_FULFILLED:
        case constants.units.GET_UNITS_LIST_REJECTED:
        case constants.units.GET_UNITS_DETAIL_REJECTED:
        case constants.units.GET_UNITS_TEMPLATES_REJECTED:
        case constants.units.GET_UNITS_FIELDS_REJECTED:
        case constants.units.POST_UNIT_DETAIL_REJECTED:
        case constants.units.CREATE_UNIT_REJECTED: {
            if (!action.payload.data.list) {
                newState.list.push({
                    type: 'error',
                    subject: `An error`,
                    verb: 'has ocurred',
                    result: `in "${action.payload.config.url}"`
                });
            }

            return newState;
        }
        case constants.content.POST_CONTENT_DETAIL_FULFILLED:
        case constants.units.POST_UNIT_DETAIL_FULFILLED: 
        case constants.bridges.POST_BRIDGES_DETAIL_FULFILLED:
        case constants.translates.POST_TRANSLATES_LIST_FULFILLED:
        case constants.profile.UPDATE_PROFILE_FULFILLED: {
            if(action.payload.data.message !== 'warning') {
                newState.list.push({
                    type: 'success',
                    subject: `"${action.payload.data.result.name}"`,
                    verb: 'was updated',
                    result: 'with success'
                });
            }
            else {
                newState.list.push({
                    type: 'warning',
                    subject: `"${action.payload.data.result}" alias`,
                    verb: 'already exist',
                    result: ''
                });
            }

            return newState;
        }
        case constants.content.CREATE_CONTENT_FULFILLED:
        case constants.bridges.CREATE_BRIDGE_FULFILLED:
        case constants.units.CREATE_UNIT_FULFILLED: {
            if (action.payload.data.message !== 'warning') {
                newState.list.push({
                    type: 'success',
                    subject: `"${action.payload.data.result.name}"`,
                    verb: 'was created',
                    result: 'with success'
                });
            }
            else {
                newState.list.push({
                    type: 'warning',
                    subject: `"${action.payload.data.result}" alias`,
                    verb: 'already exist',
                    result: ''
                });
            }

            return newState;
        }
        case constants.content.DELETE_CONTENT_FULFILLED:
        case constants.bridges.DELETE_BRIDGE_FULFILLED: {
            newState.list.push({
                type: 'success',
                subject: "Item",
                verb: 'was deleted',
                result: 'with success'
            });

            return newState;
        }
        default: {
            return state || {};
        }
    }
}