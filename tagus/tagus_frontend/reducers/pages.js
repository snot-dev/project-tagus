var constants = require('../constants/constants');
var _ = require('underscore');


module.exports = function( state, action ) {
  var newState = _.extend({}, state);

  switch( action.type ) {
    case constants.GET_PAGES: {
      newState.fetching = false;
      newState.list = action.pages;
      return newState;
    }
    case constants.GETTING_PAGES: {
      newState.fetching = true;
      return newState;
    }
    default:
      return state || {};
  }
};
