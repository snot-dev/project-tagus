let _buildTabs = function(tabList) {
    let tabs = [];

    tabList.forEach(function(tab) {
        tabs.push(tab.name);
    });

    tabs.push("Settings");

    return tabs;
};

export let lib = {
    buildTabs: _buildTabs
};