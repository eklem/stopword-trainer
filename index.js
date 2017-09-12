const ndjson = require('ndjson')
const request = require('request')
const _ = require('lodash')

request('https://rawgit.com/fergiemcdowall/reuters-21578-json/master/data/fullFileStream/justTen.str')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    // Swap this with something more robust later (lodash?)
    var text = ''
    for(var key in obj) {
      var value = obj[key];
      if (value.constructor === Array)  {
      // Check if array
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
    // Do stuff with string:
    // A: Get only words (regex)
    // B: split up into array
    // C: Add to array
    // D: Check if in array from before and update count instead
  })
