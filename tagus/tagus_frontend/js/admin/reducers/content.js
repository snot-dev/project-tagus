import { constants } from '../../constants';
import {lib} from '../../tagus_lib';

export let contentReducer = function(state, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case constants.content.GET_CONTENT_LIST_PENDING: {
            newState.fetchingContentList = true;
            return newState;
        }
        case constants.content.GET_CONTENT_LIST_FULFILLED: {
            newState.fetchingContentList = false;
            newState.list = action.payload.data;

            return newState;
        }
        case constants.content.GET_CONTENT_DETAIL_PENDING: {
            newState.fetchingContentDetail = true;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_FULFILLED: {
            newState.fetchingContentDetail = false;
            newState.detail = action.payload.data;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_UNITTYPE_PENDING: {
            newState.fetchingContentDetail = true;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_UNITTYPE_FULFILLED: {
            newState.fetchingContentDetail = false;
            newState.unit = action.payload.data;
            return newState;
        } 

        case constants.content.GETTING_PAGEDETAIL:
        {
            newState.fetchingPageDetail = true;
            return newState;
        }
        case constants.content.TAB_FIELD_CHANGED_VALUE:
        {
            newState.detail.content[action.field.alias] = action.value;
            return newState;
        }
        case constants.content.SETTINGS_FIELD_CHANGED_VALUE:
        {
            newState.detail[action.field.alias] = action.field.value;
            return newState;
        }
        case constants.content.SAVING_PAGEDETAIL:
        {
            newState.savingPageDetail = true;
            return newState;
        }
        case constants.content.SAVED_PAGEDETAIL:
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