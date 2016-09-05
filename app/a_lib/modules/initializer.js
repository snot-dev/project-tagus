var initialize = function(Model, init, res) {
        Model.find({}).count(function(err, result) {
            if(err){
                console.log(err);
            }

            if(result > 0) {
                res.json("Found " + result +" docs!");
            }
            else {
                if(Array.isArray(init)){
                    _saveArray(Model, init, res);
                }
                else if (typeof init === 'object') {
                    _createItem(Model, init, res);
                }
                else {
                    var arrayErrorMsg = 'You must initialize an array or and object!';
                    console.log(arrayErrorMsg);
                    res.json(arrayErrorMsg);
                }
            }
        });
};


var _saveArray = function(Model, arr, res){
    arr.forEach(function(item) {
        _createItem(Model, item);
    });

    _displayAllSaved(Model, res);
};

var _createItem = function(Model, item, res) {
    var thisItem = new Model(item);

    thisItem.save(function(err) {
        if(err){
            console.log(err);
            res.json(err);
        }

        if(res) {
            res.json(item);
        }
    });
};

var _displayAllSaved = function(Model, res) {
    Model.find({}, function(err, results) {
        var itemsMap = {};

        results.forEach(function(result) {
            itemsMap[result._id] = result;
        });

        res.json(itemsMap);
    });
};


module.exports = {
    initialize: initialize
};
