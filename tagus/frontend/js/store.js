import { combineReducers, createStore, applyMiddleware } from "redux";
import { contentReducer } from './admin/reducers/content';
import { initializerReducer } from './initializer/reducers/initializerReducer';
import { unitsReducer } from './admin/reducers/units';
import { unitFieldsReducer } from './admin/reducers/unitFields';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';


let rootReducer = combineReducers({
    content: contentReducer,
    initializer: initializerReducer,
    units: unitsReducer,
    unitFields: unitFieldsReducer
});


let initialState = {
    content: {
        list: {},
        treeList: [],
        detail: {},
        unit: {},
        fetchingList: false,
        fetchingDetail: false,
        savingDetail: false
    },
    units: {
        list: [],
        detail: {},
        fetchingList: false,
        fetchingDetail: false,
        savingDetail: false
    },
    unitFields: {
        list: [],
        detail: {},
        fetchingList: false,
        fetchingDetail: false,
        savingDetail: false
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