import Redux from 'redux';
import thunk from 'redux-thunk';
import pageReducer from './reducers/pages';


let rootReducer = Redux.combineReducers({
    pages: pageReducer
});

let initialState = {
    pages: {
        list: [],
        detail: {},
        fetchingPageList: false,
        fetchingPageDetail: false,
        unit: {},
        tabs: [],
        savingPageDetail: false
    }
};

let middleTest = function(store) {
    return function(next) {
        return function(action) {
            return next(action);
        }
    };
};

module.exports = Redux.applyMiddleware(thunk, middleTest)(Redux.createStore)(rootReducer, initialState);