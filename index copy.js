const _      = require('lodash')
const keys   = require('object-end-keys')
const ndjson = require('ndjson')

data = {
  docCount: 0,
  stopwordArray: [],
  calculationArray: [],
}
opts = {
  max: 100,
  extractionKeys: []
}

let termFrequency = function (obj) {
  if (data.docCount === 0) {
    getObjValues(obj)
  }
  data.docCount++
  obj = _.map(opts.extractionKeys, _.propertyOf(obj))
  let text = ''
  for(var key in opts.extractionKeys) {
    let value = obj[key]
    KEY = _.toUpper(key)
    value = KEY += _.toLower(value)
    text += (' ' + value)
  }
  let textArray = _.words(text)
  for (let word of textArray) {
    countWords(word, data.docCount)
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
  if (typeof _.find(data.calculationArray, { 'word': word }) !== "undefined") {
    let wordAtIndex = _.findIndex(data.calculationArray, {word: word});
    data.calculationArray[wordAtIndex].inCorpus = data.calculationArray[wordAtIndex].inCorpus + 1
    // Do check on documentId > lastSpottedIn. If so, inDocs += 1 and lastSpottedIn = documentId
    if (documentId > data.calculationArray[wordAtIndex].lastSpottedIn) {
      data.calculationArray[wordAtIndex].inDocs = data.calculationArray[wordAtIndex].inDocs + 1
      data.calculationArray[wordAtIndex].lastSpottedIn = documentId
    }
  } else if (typeof _.find(data.calculationArray, { 'word': word }) === "undefined") {
    let wordObject = {
      word: word,
      inCorpus: 1,
      inDocs: 1,
      lastSpottedIn: documentId,
      stopWordiness: 0
    }
    data.calculationArray.push(wordObject)    
  }
}

let documentFrequency = function (maxStopwords) {
  for (i = 0; i < data.calculationArray.length; ++i) {
    data.calculationArray[i].stopWordiness = (data.calculationArray[i].inCorpus / data.docCount) * (1 / (Math.log(data.docCount/(data.calculationArray[i].inDocs - 1))))
  }
  data.calculationArray = _.sortBy(data.calculationArray, ['stopWordiness']);
  data.calculationArray = _.reverse(data.calculationArray)
  data.stopwordArray = _.map(data.calculationArray, 'word')
  if (maxStopwords > 0) {
    data.stopwordArray = data.stopwordArray.slice(0,maxStopwords)
  }
}

// Export functions as swt:
module.exports.getObjValues = getObjValues
module.exports.termFrequency = termFrequency
module.exports.documentFrequency = documentFrequency
module.exports.ndjson = ndjson
