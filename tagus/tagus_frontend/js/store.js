import { combineReducers, createStore, applyMiddleware } from "redux";
import { contentReducer } from './admin/reducers/content';
import { initializerReducer } from './initializer/reducers/initializerReducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';


let rootReducer = combineReducers({
    content: contentReducer,
    initializer: initializerReducer
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
    },
    initializer: {
        savingUser: false,
        userCreated: false,
        user: {
            username: "",
            email: "",
            password: "",
            isAdmin: false,
        }
    }
};

export default applyMiddleware(promise(), thunk, logger())(createStore)(rootReducer, initialState);