const ndjson = require('ndjson')
const request = require('request')

//fs.createReadStream('data.txt')
request('https://raw.githubusercontent.com/fergiemcdowall/reuters-21578-json/master/data/fullFileStream/full.str')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    // obj is a javascript object 
    //console.dir(obj)
    for(var key in obj) {
      var value = obj[key];
      console.log(value)
    }
  })
