import { combineReducers, createStore, applyMiddleware } from "redux";
import { pageReducer } from './reducers/pages';
import thunk from 'redux-thunk';


let rootReducer = combineReducers({
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

export default applyMiddleware(thunk, middleTest)(createStore)(rootReducer, initialState);