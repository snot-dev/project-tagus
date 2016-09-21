var Redux = require('redux');
var thunk = require('redux-thunk').default;
var pageReducer = require('./reducers/pages');
var testReducer = require('./reducers/test');


var rootReducer = Redux.combineReducers({
  pages: pageReducer
  //test: testReducer
});

//check if 'null' works for this...
var initialState = {
  pages: null
};

var middleTest = function(store) {
  return function(next) {
    return function(action) {
      return next(action);
    }
  };
};

module.exports = Redux.applyMiddleware(thunk, middleTest)(Redux.createStore)(rootReducer,initialState);
