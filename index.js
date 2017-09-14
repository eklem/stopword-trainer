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
    var text = ''
    for(var key in obj) {
      var value = obj[key]
      value = _.lowerCase(value)
      text += (' ' + value)
    }
    var textArray = _.words(text, /[^\,.!"#$%&()\[\]{}\/\\ 0-9\f\n\r\t]+/g)
    for (let word of textArray) {
      countWords(word, docCount)  
    }
    console.log('Processing doc: #' + docCount)
  })
  .on('end', function () {
    calculateStopwords(calculationArray, docCount)
    calculationArray = _.sortBy(calculationArray, ['stopWordiness']);
    _.reverse(calculationArray)
    // Do calculation with calculationArray, sort the data and write stopwordArray to file
    calculationJSON = JSON.stringify(calculationArray)
    fs.writeFileSync('calculation.json', calculationJSON)
    console.log((calculationArray.length + 1) + ' words in ' + docCount + ' documents processed')
  })

/* Word frequency counting. Both per document corpus and in how many documents it's found */
function countWords (word, documentId) {
  if (typeof _.find(calculationArray, { 'word': word }) !== "undefined") {
    let wordAtIndex = _.findIndex(calculationArray, {word: word});
    calculationArray[wordAtIndex].inCorpus = calculationArray[wordAtIndex].inCorpus + 1
    // Do check on documentId > lastSpottedIn. If so, inDocs += 1 and lastSpottedIn = documentId
    if (documentId > calculationArray[wordAtIndex].lastSpottedIn) {
      calculationArray[wordAtIndex].inDocs = calculationArray[wordAtIndex].inDocs + 1
      calculationArray[wordAtIndex].lastSpottedIn = documentId
    }
  } else if (typeof _.find(calculationArray, { 'word': word }) === "undefined") {
    var wordObject = {
      word: word,
      inCorpus: 1,
      inDocs: 1,
      lastSpottedIn: documentId,
      stopWordiness: 0
    }
    calculationArray.push(wordObject)    
  }
}

function calculateStopwords (calculationArray, totalDocs) {
  for (i = 0; i < calculationArray.length; ++i) {
    calculationArray[i].stopWordiness = (calculationArray[i].inCorpus / totalDocs) * (1 / (Math.log(totalDocs/(calculationArray[i].inDocs - 1))))
  }
}

/* ### Do stuff with string:
   *A: Get only words & numbers(regex)
   *B: split up into array
   *C: Add to calculation array
   *D: Check if in array from before and update count instead
   *E: Do per-corpus calculation
   *G: Check if word is in doc from before and skip if yes
   *H: Do per-document calculation
*/
