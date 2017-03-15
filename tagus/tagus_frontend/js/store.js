import { combineReducers, createStore, applyMiddleware } from "redux";
import { contentReducer } from './admin/reducers/content';
import { initializerReducer } from './initializer/reducers/initializerReducer';
import { unitsReducer } from './admin/reducers/units';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';


let rootReducer = combineReducers({
    content: contentReducer,
    initializer: initializerReducer,
    units: unitsReducer
});


let initialState = {
    content: {
        list: {},
        treeList: [],
        detail: {},
        fetchingContentList: false,
        fetchingContentDetail: false,
        unit: {},
        savingPageDetail: false
    },
    units: {
        list: [],
        detail: {},
        fetchingUnitsList: false,
        fetchingUnitsDetail: false,
        savingUnitDetail: false
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