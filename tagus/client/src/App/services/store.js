import { combineReducers, createStore, applyMiddleware } from "redux";
import { contentReducer } from './content/reducer';
import { unitsReducer } from './units/reducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';


let rootReducer = combineReducers({
    content: contentReducer,
    units: unitsReducer
});


let initialState = {
    content: {
        list: [],
        treeList: {},
        detail: {},
        units: {},
        fetchingList: false,
        fetchingDetail: false,
        savingDetail: false,
        editingContent: null,
        createUnit: null
    },
    units: {
        list: [],
        dictionary: {},
        detail: {},
        fetchingList: false,
        fetchingDetail: false,
        fetchingTemplates: false,
        fetchingUnitFields: false,
        savingDetail: false,
        templates: [],
        addingTab: false,
        addingField: false,
        unitFields: []
    },
    bridges: {
        list: [],
        fetchingList: false,
        detail: {},
        fetchingDetail: false,
        savingDetail: false,
        createNew: null
    }
    // ,
    // unitFields: {
    //     list: [],
    //     detail: {},
    //     fetchingList: false,
    //     fetchingDetail: false,
    //     savingDetail: false
    // },
    // initializer: {
    //     savingUser: false,
    //     userCreated: false,
    //     user: {
    //         username: "",
    //         email: "",
    //         password: "",
    //         isAdmin: false,
    //     }
    // }
};

export default applyMiddleware(promise(), thunk, createLogger())(createStore)(rootReducer, initialState);