#!/usr/bin/env node

const _ = require('lodash')
const fs = require('fs')
const ndjson = require('ndjson')
const program = require('commander')
const request = require('request')

let calculationArray = []
let docCount = 0
let stopwordArray = []

/* Commandline construction */
program
  .version('0.0.5')
  .option('-d, --data [http://example.com/docs.str]', 'The data be processed on a streaming line delimited JSON format', 'https://rawgit.com/fergiemcdowall/reuters-21578-json/master/data/fullFileStream/justTen.str')
  .option('-c, --configuration [http://example.com/config.json]', 'Configuration file for ', 'https://rawgit.com/eklem/stopword-trainer/master/configuration.json')
  .parse(process.argv)

if (program.data) {
  console.log('Data: %j ', program.data)
  var data = program.data
  }

/* Request data
     A: Get data
     B: parse JSON objects
     C: Go through each object and count words
     D: Calculate stopwords and save to file */
request(data)
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
    stopwordArray = _.map(calculationArray, 'word');
    calculationJSON = JSON.stringify(calculationArray)
    stopwordJSON = JSON.stringify(stopwordArray)
    fs.writeFileSync('stopwords-calculation.json', calculationJSON)
    fs.writeFileSync('stopwords.json', stopwordJSON)
    console.log((calculationArray.length + 1) + ' words in ' + docCount + ' documents processed')
  })

/* Word frequency counting.
     A: Total amount in document corpus
     B: In how many documents a word is found */
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

/* Calculate TF-DF */
function calculateStopwords (calculationArray, totalDocs) {
  for (i = 0; i < calculationArray.length; ++i) {
    calculationArray[i].stopWordiness = (calculationArray[i].inCorpus / totalDocs) * (1 / (Math.log(totalDocs/(calculationArray[i].inDocs - 1))))
  }
}
