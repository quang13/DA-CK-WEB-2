const fs = require('fs');
const path = require('path');


module.exports = fs.readdirSync(__dirname + '/api/', function(err, files){
  if(err) return console.error(err);
  files.forEach((file) =>{
    require('./api/${file.substring(0, file.indexOf("."))}');
  });
});
