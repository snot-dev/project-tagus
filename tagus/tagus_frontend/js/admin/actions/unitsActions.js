import {constants} from '../../constants';
import axios from '../../axios';


let _shouldGetUnitsList = function(state) {
    return state.units.list.length === 0;
};

export function getUnitsListIfNecessary(){
    return (dispatch, getState) => {
        if( _shouldGetUnitsList(getState())) {
            dispatch( {
                type: constants.units.GET_UNITS_LIST,
                payload: axios ('units').then(results =>{ return results;})
            })
        }
    }
};