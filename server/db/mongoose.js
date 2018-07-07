const mongoose = require('mongoose');
const config = require('../../config/config');

const dbName = config.db.name;

let dbUrl = `${config.db.protocol}://${config.db.username}:${config.db.password}@${config.db.host}`;
if(config.db.port) {
  dbUrl += `:${config.db.port}/${dbName}`;
} else {
  dbUrl += `${dbName}`;
}


// mongodb atlas cluster
// "mongodb+srv://aiaexpert:aiaexpert00@mongodb-atlas-training-zmpo1.mongodb.net/test?retryWrites=true"

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl)
  .then(
    (success) => console.log('connection done..', dbUrl),
    (error) => console.log('connection err..', error)
  );
