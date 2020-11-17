const crypto = require('crypto');

let generateId = () => {
   return crypto.randomBytes(16).toString('hex');
}
module.exports = generateId;