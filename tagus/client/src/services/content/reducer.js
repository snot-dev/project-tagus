import { constants } from '../constants';
import {buildContentTree} from './helpers';

export let contentReducer = (state, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case constants.content.GET_CONTENT_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.content.GET_CONTENT_LIST_FULFILLED: {
            newState.fetchingList = false;
            newState.list = action.payload.data
            newState.treeList = buildContentTree(action.payload.data);
            return newState;
        }
        case constants.content.GET_CONTENT_DETAIL_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_FULFILLED: {
            newState.list[action.payload.data._id] = action.payload.data;
            newState.fetchingDetail = false;
            newState.detail = action.payload.data;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_UNITTYPE_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_UNITTYPE_FULFILLED: {
            newState.fetchingDetail = false;
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