const ndjson = require('ndjson')
const request = require('request')
const _ = require('lodash')

var docCount = 0
request('https://rawgit.com/fergiemcdowall/reuters-21578-json/master/data/fullFileStream/full.str')
//request('https://rawgit.com/fergiemcdowall/reuters-21578-json/master/data/fullFileStream/justTen.str')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    docCount++
    console.log('Document: #' + docCount)
    var text = ''
    for(var key in obj) {
      var value = obj[key]
      value = _.lowerCase(value)
      text += (' ' + value)
    }
    var textArray = _.words(text, /[^, ]+/g)
    //_.flatMapDeep(obj)
    console.dir(textArray)
    
    
    /*
    ### Do stuff with string:
    *A: Get only words & numbers(regex)
    *B: split up into array
     C: Add to array
     D: Check if in array from before and update count instead
    */
  })
