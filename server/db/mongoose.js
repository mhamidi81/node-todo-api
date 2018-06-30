const mongoose = require('mongoose');
const config = require('../../config/config');

const dbName = config.db.name;
// mongodb://<dbuser>:<dbpassword>@ds121371.mlab.com:21371/dbtraining
const dbUrl = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);
