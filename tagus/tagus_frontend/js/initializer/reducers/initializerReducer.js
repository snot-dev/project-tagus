import {constants} from '../../constants';

export let initializerReducer = (state, action) => {
     let newState = Object.assign({}, state);

     switch(action.type) {
         case constants.user.SAVING_USER_PENDING: {
             console.log(action);
             newState.savingUser = true;
             return newState;
         }
         case constants.user.SAVING_USER_FULFILLED: {
             newState.savingUser = false;
             newState.user = action.payload.data
             console.log(action);
             return newState;
         }
         default: 
            return state || {};
     }
};