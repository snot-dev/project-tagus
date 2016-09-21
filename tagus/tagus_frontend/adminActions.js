var constants = require('./constants');
var $ = require('jquery');


//actions
var receivedPages = function(pages) {
  return {
    type: constants.GET_PAGES,
    pages: pages
  };
};

var gettingPages = function() {
  return {
    type: constants.GETTING_PAGES
  }
};


//actions creators
var getPagesIfNeeded = function() {
  return function(dispatch, getState) {
    if(shouldGetPages(getState())) {
      dispatch(getPages());
    }
  }
};

var shouldGetPages = function(state) {
  //TODO: add more debug code
  console.log(state);
  return state.pages.list.length === 0
};

var getPages = function() {
  return function(dispatch) {
    dispatch(gettingPages());

    $.get('/api/pages', function(data){
      dispatch(receivedPages(data));
    });
  }
};

module.exports = {
  getPagesIfNeeded : getPagesIfNeeded
};
