const env = process.env.NODE_ENV || 'local'; // 'local', 'atlas' or 'mlab'
console.log(`exec env :: ${env}`);
const local = {
    app: {
        port: 3000
    },
    db: {
        protocol: 'mongodb',
        host: '127.0.0.1',
        port: 27017,
        name: 'dbtraining',
        username: 'aiaexpert',
        password: 'aiaexpert00'
    }
};

const mlab = {
    app: {
        port: 3000
    },
    db: {
        protocol: 'mongodb',
        host: 'ds121371.mlab.com',
        port: 21371,
        name: 'dbtraining',
        username: 'aiaexpert',
        password: 'aiaexpert00'
    }
};

const atlas = {
    app: {
        port: 3000
    },
    db: {
        protocol: 'mongodb+srv',
        host: 'mongodb-atlas-training-zmpo1.mongodb.net',
        port: null,
        name: 'dbtraining',
        username: 'aiaexpert',
        password: 'aiaexpert00'
    }
};

const config = {
    local,
    mlab,
    atlas
};

module.exports = config[env];
