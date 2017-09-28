const _ = require('lodash')

// https://rawgit.com/fergiemcdowall/reuters-21578-json/master/data/fullFileStream/justTen.str
// var config =  https://rawgit.com/eklem/stopword-trainer/master/config.json


//  let config = {}
//  let dataStream = './node_modules/reuters-21578-json/data/fullFileStream/justTen.str'


/* Request data, count, do calculation, save files */

var TermFrequency = function (obj, docCount, calculationArray) {
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
}
var DocumentFrequency = function () {
  calculateStopwords(calculationArray, docCount)
  calculationArray = _.sortBy(calculationArray, ['stopWordiness']);
  _.reverse(calculationArray)
  stopwordArray = _.map(calculationArray, 'word');
  calculationJSON = JSON.stringify(calculationArray)
  stopwordJSON = JSON.stringify(stopwordArray)
  fs.writeFileSync('stopwords-calculation.json', calculationJSON)
  fs.writeFileSync('stopwords.json', stopwordJSON)
  console.log((calculationArray.length + 1) + ' words in ' + docCount + ' documents processed')
}

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

// Export functions as swt:
// var swt = require('stopword-trainer')
module.exports.termFrequency = TermFrequency;
module.exports.documentFrequency = DocumentFrequency;

