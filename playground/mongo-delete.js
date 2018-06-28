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
    // db.collection('Todos').find({ text : 'Test todo' }).count().then(res => console.log(res));
    
    // db.collection('Todos').deleteMany( { text : 'Test todo' })
    //     .then(result => console.log(result));

    // db.collection('Todos').deleteOne( { text : 'Test todo' } )
    //     .then(result => console.log(result)
    // );

    db.collection('Todos').findOneAndDelete( {_id : new ObjectID('5b2fe12f3f70e7d2a9b88ee5')} )
        .then(res => console.log(res) );
        
    db.collection('Todos').find({ _id : new ObjectID('5b2fe12f3f70e7d2a9b88ee5') }).count().then(res => console.log(res));
    
    client.close();
});
