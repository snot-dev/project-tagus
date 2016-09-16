module.exports = function(Model) {
    if(!Model) {
        //Do Something!
    }
    var writeAll = function(res) {
            Model.find({}, function(err, docs) {
                if(err){
                    _handleError(err, res);
                }

                res.json(docs);
            });
        };

    var getAll = function() {
        Model.find({}, function(err, result) {
            if(err){
                console.log(err);
            }

            return (err || result);
        });

    };

    var getFromId = function(id) {
        Model.find({'_id': id}, function(err, doc) {
            if(err){
                _handleError(err);
            }

            return(doc);
        });
    };


    var createNew = function(object) {
        var obj = new Model(object);

        obj.save(function(err) {
            if(err){
                _handleError(err);
            }

            return(obj);
        });
    };


    var _handleError = function(err, res) {
            console.log(err);
            res.json(err);
    };

    var getRequiredFields = function()  {
        var schema = Model.schema.tree;
        var requiredFields = [];

        for(var key in schema) {
            if(!schema.hasOwnProperty(key)) {
                continue;
            }

            if(schema[key].hasOwnProperty('required')) {
                if(schema[key].required === true) {
                    requiredFields.push(key);
                }
            }
        }

        return requiredFields;
    };


    return {
        writeAll: writeAll,
        getAll: getAll,
        getFromId: getFromId,
        createNew: createNew,
        getRequiredFields : getRequiredFields
    };

};
