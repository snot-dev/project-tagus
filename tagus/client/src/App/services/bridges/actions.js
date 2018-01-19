import {constants} from '../constants';
import axios from '../axios';

const _shouldFetchBridgesList = state => {
    return state.bridges.list.length === 0;
}

export function getBridgesListIfNeeded() {
    return (dispatch, getState) => {
        if(_shouldFetchBridgesList(getState())) {
            dispatch({
                type: constants.bridges.GET_BRIDGES_LIST,
                payload: axios('bridges')
            })
        }
    }
}