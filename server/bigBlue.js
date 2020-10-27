var bbb = require('nodejs-bigbluebutton');
const secrets=require('./secrets.js');
bbb.salt = '';//Add Your salt key
bbb.url = ''; //Add Your Url
module.exports = {
  bbb:bbb;
}
