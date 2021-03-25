var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("pairproject", salt);

// console.log(salt, "<<<<<<<<<");
console.log(hash);

// console.log(bcrypt.compareSync("password", hash));
// console.log(bcrypt.compareSync("password-yang-salah", hash));