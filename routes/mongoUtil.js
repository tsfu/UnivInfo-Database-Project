
You can create a mongoUtil.js module that has functions to both connect to mongo and return a mongo db instance:

const MongoClient = require( 'mongodb' ).MongoClient;

const url = "mongodb+srv://Janice:123abc@cluster0-eendv.mongodb.net/test?retryWrites=true";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('550Project');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};