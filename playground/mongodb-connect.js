const { MongoClient, ObjectID } = require('mongodb');
const config = require('../config/config');

const dbUrl = `mongodb://${config.db.host}:${config.db.port}`;
const dbName = config.db.name;

MongoClient.connect(dbUrl, (err, client) => {
    if(err) {
        console.log('Unable to connect to mongodb server.', err);
        return;
    }
    console.log('Connected to mongodb server');
    const db = client.db(dbName);
    db.collection('Todos').find(
        {
          _id: new ObjectID('5b2f7844dfc88c22b4a8dcc9')
        }).toArray().then(
        docs => { 
          docs.forEach(doc => console.log(doc.text, '=>', doc.completed) );
        }, 
        err => console.log(err)
        
    );

    client.close();
});