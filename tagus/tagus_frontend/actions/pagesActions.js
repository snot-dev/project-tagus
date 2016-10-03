var constants = require('../constants');
var $ = require('jquery');
var lib = require('../tagus_lib');

//actions
var _fetchingPageList = function() {
    return {
        type: constants.GETTING_PAGELIST
    }
};

var _receivedPageList = function(pageList) {
    var list = lib.loadContentTree(pageList);

    return {
        type: constants.RECEIVED_PAGELIST,
        pageList: list
    };
};

var _fetchingPageDetail = function() {
    return {
        type: constants.GETTING_PAGEDETAIL
    }
}

var _receivedPageDetail = function(page) {
    return {
        type: constants.RECEIVED_PAGEDETAIL,
        page: page,
        tabs: lib.buildTabs(page.unitType.tabs)
    }
}

var _tabFieldChanged = function(tab, field, value) {
    return {
        type: constants.TAB_FIELD_CHANGED_VALUE,
        tab: tab,
        field: field,
        value: value
    }
}

var _settingsFieldChanged = function(field) {
    return {
        type: constants.SETTINGS_FIELD_CHANGED_VALUE,
        field: field
    };
}

var _savingPageDetail = function() {
    return {
        type: constants.SAVING_PAGEDETAIL
    }
};

var _savedPage = function(pageDetail, pageList) {
    var list = lib.loadContentTree(pageList);

    return {
        type: constants.SAVED_PAGEDETAIL,
        pageDetail: pageDetail,
        pageList: list
    }
}

//actions creators
var _getPageListIfNeeded = function() {
    return function(dispatch, getState) {
        if (_shouldGetPageList(getState())) {
            dispatch(_getPageList());
        }
    }
};

var _shouldGetPageList = function(state) {
    //TODO: add more debug code
    return state.pages.list.length === 0;
};

var _getPageList = function() {
    return function(dispatch) {
        //add Error handling

        dispatch(_fetchingPageList());

        $.get('/api/pages?contenttree=true', function(data) {
            dispatch(_receivedPageList(data));
        });
    }
};

var _getPageDetailIfNeeded = function(id) {
    return function(dispatch, getState) {
        if (_shouldGetPageDetail(getState(), id)) {
            dispatch(_getPageDetail(id));
        }
    }
}

var _shouldGetPageDetail = function(state, id) {
    //TODO: add more debug code

    return !state.pages.detail._id || state.pages.detail._id !== id;
};

var _getPageDetail = function(id) {
    return function(dispatch) {
        dispatch(_fetchingPageDetail());

        $.get('/api/pages/' + id, function(data) {
            //add Error handling

            dispatch(_receivedPageDetail(data))
        });
    }
};

var _changedTabFieldValue = function(tab, field, value) {
    return function(dispatch, getState) {
        dispatch(_tabFieldChanged(tab, field, value));
    }
}

var _changedSettingsFieldValue = function(field) {
    return function(dispatch, getState) {
        dispatch(_settingsFieldChanged(field));
    }
}

var _savePageDetail = function(page) {
    return function(dispatch) {
        dispatch(_savingPageDetail());

        $.post('/api/pages/' + page._id, page, function(pageDetail) {
            $.get('/api/pages?contenttree=true', function(pageList) {
                dispatch(_savedPage(pageDetail, pageList));
            });
        });

    }
};

var _resetPageDetail = function(id) {
    return function(dispatch) {
        dispatch(_getPageDetail(id));
    }
}

module.exports = {
    getPageListIfNeeded: _getPageListIfNeeded,
    getPageDetailIfNeeded: _getPageDetailIfNeeded,
    changedTabFieldValue: _changedTabFieldValue,
    changedSettingsFieldValue: _changedSettingsFieldValue,
    savePageDetail: _savePageDetail,
    resetPageDetail: _resetPageDetail
};