var React = require('react');
var dateFormat = require('dateformat');
var RichTextEditor = require('react-quill');
var _ = require('underscore');

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


var _buildTabs = function(tabList) {
    var tabs = [];
    
    tabList.forEach(function(tab) {
        tabs.push(tab.name);
    });

    tabs.push("Settings");

    return tabs;
};

module.exports = {
    loadContentTree: _loadContentTree,
    buildTabs: _buildTabs,
    renderFieldType: _renderFieldType,
    renderSettingsTab: _renderSettings,
    createTabInPage: _createTabInPage,
    createFieldInPage: _createFieldInPage
};