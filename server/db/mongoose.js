const mongoose = require('mongoose');
const config = require('../../config/config');

const dbName = config.db.name;
const dbUrl = `${config.db.protocol}://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${dbName}`;

// mongodb atlas cluster
// "mongodb+srv://aiaexpert:aiaexpert00@mongodb-atlas-training-zmpo1.mongodb.net/test?retryWrites=true"

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl)
  .then(
    (success) => console.log('connection done..', dbUrl),
    (error) => console.log('connection err..', error)
  );
