var loadContentTree = function(pageList) {
    if(!pageList) {
        //error
    }

    var list = {},
        treeList = [];

    pageList.forEach(function(item){
        list[item._id] = item;
        item.children = [];
    }) ;

    pageList.forEach(function(item){
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