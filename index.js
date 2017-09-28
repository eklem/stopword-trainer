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


function countWords (word, documentId, calculationArray) {
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
  console.log(calculationArray)
}
  return calculationArray

}

// Export functions as swt:
// var swt = require('stopword-trainer')
module.exports.termFrequency = termFrequency;

