import _ from 'lodash';
import axios from '../axios';
import {constants} from '../constants';


const _shouldGetUserDetail = (state, id) => {
    return !state.users.detail._id || state.users.detail._id !== id;
}

export function getUsersIfNeeded() {
    return (dispatch, getState) => {
        if (getState().users.list.length === 0) {
            dispatch({
                type: constants.users.GET_USERS_LIST,
                payload: axios.get('users')
            });
        }
    };
}

export function getUserDetailIfNeeded(id) {
    return (dispatch, getState) => {
        const state = getState();
        
        if (_shouldGetUserDetail(state, id)) {
            if (state.users.dictionary[id]) {
                dispatch({
                    type: constants.users.GET_USER_DETAIL_FULFILLED,
                    payload: {data: _.cloneDeep(state.users.dictionary[id])} 
                });
            }
            else {
                dispatch({
                    type: constants.users.GET_USER_DETAIL,
                    payload: axios.get(`users/${id}`)
                });
            }
        }
    };
}