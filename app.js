require('./caps')
let vendor = require('./vendor');
let driver = require('./driver.js')
const resultFunction = setInterval(function () {

let obj = vendor();
driver(obj);

},5000)

