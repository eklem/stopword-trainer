const fs = require('fs')
const _ = require('lodash')

/* Request data, count, do calculation, save files */

let termFrequency = function (obj, docCount, calculationArray) {
  docCount++
  var text = ''
  for(var key in obj) {
    var value = obj[key]
    value = _.lowerCase(value)
    text += (' ' + value)
  }
  var textArray = _.words(text, /[^\,.!"#$%&()\[\]{}\/\\ 0-9\f\n\r\t]+/g)
  for (let word of textArray) {
    countWords(word, docCount, calculationArray)
    //console.log(word + ': ' + docCount)
  }
  console.log('Processing doc: #' + docCount)
  console.log('Calculation array: ' + calculationArray.length)
}

let countWords = function (word, documentId, calculationArray) {
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

let documentFrequency = function (docCount, calculationArray) {
  calculateStopwords(calculationArray, docCount)
  calculationArray = _.sortBy(calculationArray, ['stopWordiness']);
  _.reverse(calculationArray)
  stopwordArray = _.map(calculationArray, 'word');
  calculationJSON = JSON.stringify(calculationArray)
  stopwordJSON = JSON.stringify(stopwordArray)
  fs.writeFileSync('stopwords-calculation.json', calculationJSON)
  fs.writeFileSync('stopwords.json', stopwordJSON)
  console.log((calculationArray.length + 1) + ' words in ' + docCount + ' documents processed')
  return stopwordJSON
}


let calculateStopwords = function (calculationArray, totalDocs) {
  for (i = 0; i < calculationArray.length; ++i) {
    calculationArray[i].stopWordiness = (calculationArray[i].inCorpus / totalDocs) * (1 / (Math.log(totalDocs/(calculationArray[i].inDocs - 1))))
  }
}

// Export functions as swt:
// var swt = require('stopword-trainer')
module.exports.termFrequency = termFrequency
module.exports.countWords = countWords
module.exports.documentFrequency = documentFrequency
module.exports.calculateStopwords = calculateStopwords
