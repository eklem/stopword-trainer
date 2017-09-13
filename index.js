const _ = require('lodash')
const fs = require('fs')
const ndjson = require('ndjson')
const request = require('request')

let calculationArray = []
let docCount = 0
let stopwordArray = []

request('https://rawgit.com/fergiemcdowall/reuters-21578-json/master/data/fullFileStream/full.str')
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
    //console.dir(textArray)
    // loop throug array and call countWords for each word
    for (let word of textArray) {
      countWords(word)  
    }
    //console.log(calculationArray)
  })
  .on('end', function () {
    calculationArray =  _.sortBy(calculationArray, ['inCorpus']);
    _.reverse(calculationArray)
    console.log(calculationArray)
    // Do calculation with calculationArray, sort the data and write stopwordArray to file
    calculationJSON = JSON.stringify(calculationArray)
    fs.writeFileSync('calculation.json', calculationJSON)
    console.log('we have come to the end')
  })

/* Calculate per corups frequency */
function countWords (word) {
  if (typeof _.find(calculationArray, { 'word': word }) !== "undefined") {
    //console.log('Hello found!')
    let wordAtIndex = _.findIndex(calculationArray, {word: word});
    //console.log('wordAtIndex: ' + wordAtIndex)
    calculationArray[wordAtIndex].inCorpus = calculationArray[wordAtIndex].inCorpus + 1
    //console.log(calculationArray[wordAtIndex])
  }
  if (typeof _.find(calculationArray, { 'word': word }) === "undefined") {
    //console.log('Hello not found!')
    var wordObject = {
      word: word,
      inCorpus: 1
    }
    calculationArray.push(wordObject)    
  }
}


/* ### Do stuff with string:
   *A: Get only words & numbers(regex)
   *B: split up into array
   *C: Add to calculation array
   *D: Check if in array from before and update count instead
    E: Do per-corpus calculation
    G: Check if in doc from before and skip if yes
    H: Do per-document calculation
*/
  
  
