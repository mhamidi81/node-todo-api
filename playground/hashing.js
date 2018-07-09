const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
    id: 10
};

const token = jwt.sign(data, 'somesecret');
// jwt.io
console.log(token);
var decoded = jwt.verify(token, 'somesecret');
console.log(decoded);



/* const message = 'I am user number 3';
const hash = SHA256(message).toString();

console.log(message);
console.log(hash);

const data = {
    id: 4
};

const token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed, do not trust!');
}
 */