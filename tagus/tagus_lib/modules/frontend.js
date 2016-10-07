var loadContentTree = function(options) {
    if(!options.list) {
        //error
    }

    var list = {},
        treeList = [];

    options.list.forEach(function(item){
        list[item._id] = item;
        item.children = [];
    }) ;

    options.list.forEach(function(item){
        if(item.parent) {
            list[item.parent].children.push(item);
        }
        else {
            treeList.push(item);
        }
    });

    return treeList;
};

module.exports = {
    loadContentTree: loadContentTree
};