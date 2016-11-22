var _buildTabs = function(tabList) {
    var tabs = [];

    tabList.forEach(function(tab) {
        tabs.push(tab.name);
    });

    tabs.push("Settings");

    return tabs;
};

module.exports = {
    buildTabs: _buildTabs
};