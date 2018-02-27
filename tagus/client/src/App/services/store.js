import { combineReducers, createStore, applyMiddleware } from "redux";
import { contentReducer } from './content/reducer';
import { unitsReducer } from './units/reducer';
import { bridgesReducer } from './bridges/reducer';
import { messagesReducer } from './messages/reducer';
import { translatesReducer } from './translates/reducer';
import { usersReducer } from './users/reducer';
import { authReducer } from './auth/reducer';
import { profileReducer} from './profile/reducer';
import {installerReducer} from './installer/reducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';

const rootReducer = combineReducers({
    content: contentReducer,
    units: unitsReducer,
    bridges: bridgesReducer,
    messages: messagesReducer,
    translates: translatesReducer,
    users: usersReducer,
    auth: authReducer,
    installer: installerReducer,
    profile: profileReducer
});

const initialState = {
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
        units: {},
        fetchingList: false,
        detail: {},
        fetchingDetail: false,
        savingDetail: false,
        createNew: null
    },
    messages: {
        list: []
    },
    translates: {
        list: [],
        fetchingList: false, 
        savingList: false
    },
    users: {
        list: [],
        dictionary: {},
        detail: {},
        fetchingList: false,
        fetchingDetail: false,
        savingDetail: false
    },
    auth: {
        loggingIn: false,
        loggedIn: false,
        fetchingLoggedUser: false,
        hasUsers: true,
        result: null,
        user: {}
    },
    profile: {
        user: {},
        savingUser: false
    },
    installer: {
        shouldInstall: true,
        checkingInfo: false,
        checkedInfo: false
    }
};

export default applyMiddleware(promise(), thunk, createLogger())(createStore)(rootReducer, initialState);