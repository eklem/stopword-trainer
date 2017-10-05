const _ = require('lodash')
const ndjson = require('ndjson')

let termFrequency = function (obj, docCount, calculationArray) {
  let text = ''
  for(var key in obj) {
    let value = obj[key]
    value = _.lowerCase(value)
    text += (' ' + value)
  }
  let textArray = _.words(text, /[^\,.!"#$%&()\[\]{}\/\\ 0-9\f\n\r\t]+/g)
  for (let word of textArray) {
    countWords(word, docCount, calculationArray)
  }
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
    let wordObject = {
      word: word,
      inCorpus: 1,
      inDocs: 1,
      lastSpottedIn: documentId,
      stopWordiness: 0
    }
    opts.calculationArray.push(wordObject)    
  }
}

let documentFrequency = function (totalDocs, calculationArray) {
  for (i = 0; i < calculationArray.length; ++i) {
    calculationArray[i].stopWordiness = (calculationArray[i].inCorpus / totalDocs) * (1 / (Math.log(totalDocs/(calculationArray[i].inDocs - 1))))
  }
  opts.calculationArray = _.sortBy(calculationArray, ['stopWordiness']);
  opts.calculationArray = _.reverse(opts.calculationArray)
  opts.stopwordArray = _.map(opts.calculationArray, 'word')
}

// Export functions as swt:
module.exports.termFrequency = termFrequency
module.exports.documentFrequency = documentFrequency
module.exports.ndjson = ndjson
