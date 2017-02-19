import { constants } from '../../constants';
import {lib} from '../../tagus_lib';

export let contentReducer = function(state, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case constants.GET_CONTENT_LIST_PENDING: {
            newState.fetchingContentList = true;
            return newState;
        }
        case constants.GET_CONTENT_LIST_FULFILLED: {
            newState.fetchingContentList = false;
            newState.list = action.payload.data;

            return newState;
        }
        case constants.GET_CONTENT_DETAIL_PENDING: {
            newState.fetchingContentDetail = true;
            return newState;
        }    
        case constants.GET_CONTENT_DETAIL_FULFILLED: {
            newState.fetchingContentDetail = false;
            newState.detail = action.payload.data;
            return newState;
        }    
        case constants.GET_CONTENT_DETAIL_UNITTYPE_PENDING: {
            newState.fetchingContentDetail = true;
            return newState;
        }    
        case constants.GET_CONTENT_DETAIL_UNITTYPE_FULFILLED: {
            newState.fetchingContentDetail = false;
            newState.unit = action.payload.data;
            newState.tabs = lib.buildTabs(action.payload.data.tabs);
            return newState;
        } 

        case constants.GETTING_PAGEDETAIL:
            {
                newState.fetchingPageDetail = true;
                return newState;
            }
        case constants.RECEIVED_PAGEDETAIL:
            {
                newState.fetchingPageDetail = false;
                newState.detail = action.page;
                if (action.tabs) {
                    newState.tabs = action.tabs;
                }
                if (action.unit) {
                    newState.unit = action.unit;
                }
                return newState;
            }
        case constants.CHANGE_TAB:
            {
                newState.tab = action.tab;
                return newState;
            }
        case constants.TAB_FIELD_CHANGED_VALUE:
            {
                newState.detail.content[action.field.alias] = action.value;
                return newState;
            }
        case constants.SETTINGS_FIELD_CHANGED_VALUE:
            {
                newState.detail[action.field.alias] = action.field.value;
                return newState;
            }
        case constants.SAVING_PAGEDETAIL:
            {
                newState.savingPageDetail = true;
                return newState;
            }
        case constants.SAVED_PAGEDETAIL:
            {
                newState.savingPageDetail = false;
                newState.detail = action.pageDetail;
                newState.list = action.pageList;

                return newState;
            }
        default:
            return state || {};
    }
};