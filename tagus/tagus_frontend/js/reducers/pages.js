let constants = require('../constants');
let _ = require('underscore');

module.exports = function(state, action) {
    let newState = _.extend({}, state);

    switch (action.type) {
        case constants.GETTING_PAGELIST:
            {
                newState.fetchingPageList = true;
                return newState;
            }
        case constants.RECEIVED_PAGELIST:
            {
                newState.fetchingPageList = false;
                newState.list = action.pageList;
                return newState;
            }
        case constants.GETTING_PAGEDETAIL:
            {
                newState.fetchingPageDetail = true;
                return newState;
            }
        case constants.RECEIVED_PAGEDETAIL:
            {
                newState.fetchingPageDetail = false;
                newState.detail = action.page;
                if (action.tabs) {
                    newState.tabs = action.tabs;
                }
                if (action.unit) {
                    newState.unit = action.unit;
                }
                return newState;
            }
        case constants.CHANGE_TAB:
            {
                newState.tab = action.tab;
                return newState;
            }
        case constants.TAB_FIELD_CHANGED_VALUE:
            {
                newState.detail.content[action.field.alias] = action.value;
                return newState;
            }
        case constants.SETTINGS_FIELD_CHANGED_VALUE:
            {
                newState.detail[action.field.alias] = action.field.value;
                return newState;
            }
        case constants.SAVING_PAGEDETAIL:
            {
                newState.savingPageDetail = true;
                return newState;
            }
        case constants.SAVED_PAGEDETAIL:
            {
                newState.savingPageDetail = false;
                newState.detail = action.pageDetail;
                newState.list = action.pageList;

                return newState;
            }
        default:
            return state || {};
    }
};