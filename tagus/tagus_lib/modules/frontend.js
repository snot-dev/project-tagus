var loadContentTree = function(options) {
    if(!options.list) {
        //error
    }

    var list = {};

    for(var i = 0, l = options.list.lenght; i < l;  i+=1) {
        var thisItem = options.list[i];
        
        if(!_existsInList(list, thisItem.name)) {
            listItem[thisItem.name] = _createItem(thisItem);
        }
        else {
            if(!list[thisItem.name].hasOwnProperty("id")) {
                list[thisItem.name].id = thisItem._id;
            }

            if(!list[thisItem.name].hasOwnProperty("children")) {
                list[thisItem.name].children = [];
            }
        }

        if(_hasParent(thisItem)) {
            if(_existsInList(list, thisItem.parent)) {
                list[thisItem.parent].children.push(_createItem(thisItem));
            }
        }

       
    }
};

var _hasParent = function(item) {
    return item.parent;
}

var _existsInList = function(list, key) {
    //improve
    if(list[key]) {
        return true
    }
    else{
        return false;
    }
}


var _createItem = function(item) {
    return {
        name: item.name,
        id: item._id,
        children: []
    }
}

//is created? create.
// has parent? is created? create



module.exports = {};