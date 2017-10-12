const _      = require('lodash')
const keys   = require('object-end-keys')
const ndjson = require('ndjson')


let termFrequency = function (obj) {
  opts.docCount++
  getObjValues(obj)
  obj = _.map(opts.extractionKeys, _.propertyOf(obj))
  let text = ''
  for(var key in opts.extractionKeys) {
    let value = obj[key]
    KEY = _.upperCase(key)
    value = KEY += _.lowerCase(value)
    text += (' ' + value)
  }
  let textArray = _.words(text, /[^\,.!"#$%&()\[\]{}\/\\ 0-9\f\n\r\t]+/g)
  for (let word of textArray) {
    countWords(word, opts.docCount)
  }
  //console.log(textArray)
}

let getObjValues = function(obj) {
  if (typeof opts.extractionKeys[0] === 'undefined' || typeof opts.extractionKeys[0] === null) {
    opts.extractionKeys = keys(obj)
    console.log('keys found in object: ' + opts.extractionKeys)
  } else {
    console.log('keys defined: ' + opts.extractionKeys)
  }
}

let countWords = function (word, documentId) {
  if (typeof _.find(opts.calculationArray, { 'word': word }) !== "undefined") {
    let wordAtIndex = _.findIndex(opts.calculationArray, {word: word});
    opts.calculationArray[wordAtIndex].inCorpus = opts.calculationArray[wordAtIndex].inCorpus + 1
    // Do check on documentId > lastSpottedIn. If so, inDocs += 1 and lastSpottedIn = documentId
    if (documentId > opts.calculationArray[wordAtIndex].lastSpottedIn) {
      opts.calculationArray[wordAtIndex].inDocs = opts.calculationArray[wordAtIndex].inDocs + 1
      opts.calculationArray[wordAtIndex].lastSpottedIn = documentId
    }
  } else if (typeof _.find(opts.calculationArray, { 'word': word }) === "undefined") {
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

let documentFrequency = function (maxStopwords) {
  for (i = 0; i < opts.calculationArray.length; ++i) {
    opts.calculationArray[i].stopWordiness = (opts.calculationArray[i].inCorpus / opts.docCount) * (1 / (Math.log(opts.docCount/(opts.calculationArray[i].inDocs - 1))))
  }
  opts.calculationArray = _.sortBy(opts.calculationArray, ['stopWordiness']);
  opts.calculationArray = _.reverse(opts.calculationArray)
  opts.stopwordArray = _.map(opts.calculationArray, 'word')
  if (maxStopwords > 0) {
    opts.stopwordArray = opts.stopwordArray.slice(0,maxStopwords)
  }
}

// Export functions as swt:
module.exports.getObjValues = getObjValues
module.exports.termFrequency = termFrequency
module.exports.documentFrequency = documentFrequency
module.exports.ndjson = ndjson
