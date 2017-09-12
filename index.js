const ndjson = require('ndjson')
const request = require('request')
const _ = require('lodash')

//fs.createReadStream('data.txt')
request('https://rawgit.com/fergiemcdowall/reuters-21578-json/master/data/fullFileStream/justTen.str')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    // obj is a javascript object
    //console.dir(obj)
    var text = ''
    for(var key in obj) {
      var value = obj[key];
      if (value.constructor === Array)  {
        //console.log('Here comes an array!!!')
        for (let arrayValue of value) {
          //console.log(arrayValue)
          text += (' ' + arrayValue)
        }
      } else {
        //console.log(value)
        text += (' ' + value)
      }
    }
    console.log(text)
  })
