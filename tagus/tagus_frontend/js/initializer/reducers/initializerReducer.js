import {constants} from '../../constants';

export let initializerReducer = (state, action) => {
     let newState = Object.assign({}, state);

     switch(action.type) {
         case constants.user.SAVING_USER_PENDING: {
             newState.savingUser = true;
             return newState;
         }
         case constants.user.SAVING_USER_FULFILLED: {
             newState.savingUser = false;
             newState.userCreated = true;
             newState.user = action.payload.data
             return newState;
         }
         default: 
            return state || {};
     }
};