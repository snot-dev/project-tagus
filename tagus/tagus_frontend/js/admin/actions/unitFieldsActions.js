import {constants} from '../../constants';
import axios from '../../axios';


let _shouldGetUnitFieldsList = function(state) {
    return state.unitFields.list.length === 0;
};

let _shouldGetUnitDetail = function(state, id) {
    //TODO: add more debug code

    return !state.unitFieldss.detail._id || state.unitFields.detail._id !== id;
};

export function getUnitDetailIfNeeded(id) {
    return (dispatch, getState) => {
        if(_shouldGetUnitDetail(getState(), id)) {
            dispatch({
                type: constants.unitFields.GET_UNITFIELDS_DETAIL,
                payload: axios('unitfieldss/' + id).then(results => {
                    return results;
                })
            });
        }
    };
};

export function getUnitsListIfNecessary(){
    return (dispatch, getState) => {
        if( _shouldGetUnitFieldsList(getState())) {
            dispatch( {
                type: constants.unitFields.GET_UNITFIELDS_LIST,
                payload: axios ('unitfields').then(results =>{ return results;})
            })
        }
    }
};