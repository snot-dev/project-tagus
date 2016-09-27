var constants = require('../constants');
var _ = require('underscore');

module.exports = function(state, action) {
    var newState = _.extend({}, state);

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
                newState.tabs = action.tabs;
                return newState;
            }
        default:
            return state || {};
    }
};