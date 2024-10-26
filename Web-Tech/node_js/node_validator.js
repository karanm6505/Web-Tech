// import val from 'validator'; does not work in the latest version of node
const val = require('validator');
var email = 'xys@gmail.com'
console.log(val.isEmail(email))
email = 'xyz@.edu'
console.log(val.isEmail(email))
var name = 'john'
console.log(val.isLowercase(name))
console.log(val.isUppercase(name))
var name = 'JOHN'
console.log(val.isLowercase(name))
console.log(val.isUppercase(name))
name = ''
console.log(val.isEmpty(name))
