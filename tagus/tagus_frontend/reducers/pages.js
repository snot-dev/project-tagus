var constants = require('../constants');
var _ = require('underscore');

module.exports = function( state, action ) {
  var newState = _.extend({}, state);

  switch( action.type ) {
    case constants.GET_PAGES: {
      newState.isFetching = false;
      newState.list = action.pages;
      return newState;
    }
    case constants.GETTING_PAGES: {
      newState.isFetching = true;
      return newState;
    }
    default:
      return state || {};
  }
};
