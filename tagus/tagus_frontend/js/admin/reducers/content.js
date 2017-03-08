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
            newState.treeList = action.payload.data;
            return newState;
        }
        case constants.content.GET_CONTENT_DETAIL_PENDING: {
            newState.fetchingContentDetail = true;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_FULFILLED: {
            newState.list[action.payload.data._id] = action.payload.data;
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
        case constants.content.GET_UPDATED_CONTENT_FIELD: {
            newState.detail.content[action.payload.name] = action.payload.value;
            return newState;
        }
        case constants.content.POST_CONTENT_DETAIL_PENDING: {
            newState.savingContent = true;
            return newState;
        }
        case constants.content.POST_CONTENT_DETAIL_FULFILLED: {
            newState.list[action.payload.data._id] = action.payload.data;
            newState.savingContent = false;
            newState.detail = action.payload.data;
            return newState;
        }
        default:
            return state || {};
    }
};