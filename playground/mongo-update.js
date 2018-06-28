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
    
    // db.collection('Todos').updateMany({ completed: false}, { $set : {completed : true}} )
    //     .then( res => console.log(res));

    db.collection('Users').findOneAndUpdate( 
        {
            _id : new ObjectID('5b2f79ef597a043f10bf2186')
        },
        {
            $set : { name: 'Hamidi Ibrahim' },
            $inc : { age: -1 } 
        },
        { 
            returnOriginal : true 
        } 
    )
    .then(rees => console.log(rees)
    );
    
    client.close();
});
