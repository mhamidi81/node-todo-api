const MongoClient = require('mongodb').MongoClient;
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
    /* db.collection('Todos').insertOne(
        {
            text: "Learn nodeJs",
            completed: false
        },
        (err, result) => {
            if(err) {
                return console.log('Unable to insert todo \r\n', err);
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
        }
    ); */

    db.collection('Users').insertOne(
        {
            name: "Mohamed Hamidi",
            age: 26,
            location: "Casablanca"
        },
        (err, result) => {
            if(err) {
                return console.log('Unable to insert user \r\n', err);
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
        }
    );

    client.close();
});