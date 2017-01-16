var mongoose = require('mongoose');

module.exports = {
    connectionSettings: {
        'url': process.env.MONGO_CONNECTION_STRING
    },
    connect: function() {
        return mongoose.connect(this.connectionSettings.url);
    },
    checkConnection: mongoose.connection.readyState,
    checkIfConnected: function(){
        mongoose.connection.on('connected', function () {
            console.log("mongoose " + mongoose.connection.readyState);
          console.log('Mongoose default connection open');
        });
    },
    checkIfCollections: mongoose.connection.db.listCollections().toArray( function( err, names ) {
        if( err ){
            //TODO: Throw err
        }
        else {
            return names.length;
        }
    })
};
