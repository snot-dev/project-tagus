import { combineReducers, createStore, applyMiddleware } from "redux";
import { contentReducer } from './reducers/content';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';


let rootReducer = combineReducers({
    content: contentReducer
});


let initialState = {
    content: {
        list: [],
        detail: {},
        fetchingContentList: false,
        fetchingContentDetail: false,
        unit: {},
        tabs: [],
        savingPageDetail: false
    }
};

export default applyMiddleware(promise(), thunk, logger())(createStore)(rootReducer, initialState);