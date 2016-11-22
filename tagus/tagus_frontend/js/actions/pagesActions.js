import constants from '../constants';
import lib from '../tagus_lib';
import $ from 'jquery';


//actions
let _fetchingPageList = function() {
    return {
        type: constants.GETTING_PAGELIST
    }
};

let _receivedPageList = function(pageList) {
    let list = pageList;

    return {
        type: constants.RECEIVED_PAGELIST,
        pageList: list
    };
};

let _fetchingPageDetail = function() {
    return {
        type: constants.GETTING_PAGEDETAIL
    }
}

let _receivedPageDetail = function(pageDetail, unit) {
    let obj = {
        type: constants.RECEIVED_PAGEDETAIL,
        page: pageDetail
    }

    if (unit) {
        obj.tabs = lib.buildTabs(unit.tabs);
        obj.unit = unit;
    }

    return obj;
}

let _tabFieldChanged = function(field, value) {
    return {
        type: constants.TAB_FIELD_CHANGED_VALUE,
        field: field,
        value: value
    }
}

let _settingsFieldChanged = function(field) {
    return {
        type: constants.SETTINGS_FIELD_CHANGED_VALUE,
        field: field
    };
}

let _savingPageDetail = function() {
    return {
        type: constants.SAVING_PAGEDETAIL
    }
};

let _savedPage = function(pageDetail, pageList) {
    let list = pageList;

    return {
        type: constants.SAVED_PAGEDETAIL,
        pageDetail: pageDetail,
        pageList: list
    }
}

//actions creators
let _getPageListIfNeeded = function() {
    return function(dispatch, getState) {
        if (_shouldGetPageList(getState())) {
            dispatch(_getPageList());
        }
    }
};

let _shouldGetPageList = function(state) {
    //TODO: add more debug code
    return state.pages.list.length === 0;
};

let _getPageList = function() {
    return function(dispatch) {
        //add Error handling

        dispatch(_fetchingPageList());

        $.get('/api/pages?contenttree=true', (data) => {
            dispatch(_receivedPageList(data));
        });
    }
};

let _getPageDetailIfNeeded = function(id) {
    return function(dispatch, getState) {
        if (_shouldGetPageDetail(getState(), id)) {
            dispatch(_getPageDetail(id));
        }
    }
}

let _shouldGetPageDetail = function(state, id) {
    //TODO: add more debug code

    return !state.pages.detail._id || state.pages.detail._id !== id;
};

let _getPageDetail = function(id) {
    return function(dispatch) {
        dispatch(_fetchingPageDetail());

        $.get('/api/pages/' + id, (pageDetail) => {
            //TODO: add Error handling
            $.get('/api/units/' + pageDetail.unitType.id, (unit) => {
                dispatch(_receivedPageDetail(pageDetail, unit));
            });

        });
    }
};

let _changedTabFieldValue = function(field, value) {
    return function(dispatch, getState) {
        dispatch(_tabFieldChanged(field, value));
    }
}

let _changedSettingsFieldValue = function(field) {
    return function(dispatch, getState) {
        dispatch(_settingsFieldChanged(field));
    }
}

let _savePageDetail = function(page) {
    return function(dispatch) {
        dispatch(_savingPageDetail());

        $.post('/api/pages/' + page._id, page, (pageDetail) => {
            $.get('/api/pages?contenttree=true', (pageList) => {
                dispatch(_savedPage(pageDetail, pageList));
            });
        });

    }
};

let _resetPageDetail = function(id) {
    return function(dispatch) {
        dispatch(_getPageDetail(id));
    }
}

export let pageActions = {
    getPageListIfNeeded: _getPageListIfNeeded,
    getPageDetailIfNeeded: _getPageDetailIfNeeded,
    changedTabFieldValue: _changedTabFieldValue,
    changedSettingsFieldValue: _changedSettingsFieldValue,
    savePageDetail: _savePageDetail,
    resetPageDetail: _resetPageDetail
};