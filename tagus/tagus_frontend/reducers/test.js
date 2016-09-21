var constants = require('../constants');
var _ = require('underscore');


module.exports = function( state, action ) {
  var newState = _.extend({}, state);

  console.log("test State");
  console.log(state);

  switch( action.type ) {
    case constants.GET_PAGES: {
      newState.banana = action.banana;
      console.log("test New State");
      console.log(newState);
      return newState;
    }
    default:
      return state || {};
  }
};
