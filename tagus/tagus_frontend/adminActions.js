var constants = require('./constants');
var $ = require('jquery');

//actions
var receivedPages = function(pages) {
    var list = _loadContentTree(pages);

    return {
        type: constants.GET_PAGES,
        pages: list
    };
};

var gettingPages = function() {
    return {
        type: constants.GETTING_PAGES
    }
};


//actions creators
var getPagesIfNeeded = function() {
    return function(dispatch, getState) {
        if (shouldGetPages(getState())) {
            dispatch(getPages());
        }
    }
};

var shouldGetPages = function(state) {
    //TODO: add more debug code
    return state.pages.list.length === 0;
};

var getPages = function() {
    return function(dispatch) {
        dispatch(gettingPages());

        $.get('/api/pages?contenttree=true', function(data) {
            dispatch(receivedPages(data));
        });
    }
};

var _loadContentTree = function(list) {
    if (!list) {
        //error
    }

    var lookoutList = {},
        treeList = [];

    list.forEach(function(item) {
        lookoutList[item._id] = item;
        item.children = [];
    });

    list.forEach(function(item) {
        if (item.parent) {
            lookoutList[item.parent].children.push(item);
        } else {
            treeList.push(item);
        }
    });

    return treeList;
};

module.exports = {
    getPagesIfNeeded: getPagesIfNeeded
};