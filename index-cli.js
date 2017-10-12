#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const swt = require('./index.js')

opts = {
  docCount: 0,
  stopwordArray: [],
  calculationArray: [],
  max: 0,
  extractionKeys: []
}

/* program construction */
program
  .version('0.1.4')
  .option('-f --file <file>', 'the data file to be processed on a line delimited, streaming JSON format')
  .option('-k --keys [object keys]', 'comma-separated list of object keys for all object values to be processed')
  .option('-m --max [number-of-stopwords]', 'the max number of stopwords to store. All if not defined')
  .parse(process.argv)

if (program.file) {
  var file = program.file
  console.log('Will process file: ' + file)
}
if (program.max) {
  opts.max = Number(program.max)
  if (opts.max > 0) {
    console.log('Will store ' + opts.max + ' stopwords')
  } else {
    console.log('Will store all words as stopwords')
  }
}
if (program.keys) {
  opts.extractionKeys = program.keys
  if (program.keys) {
    opts.extractionKeys = program.keys.split(',')
    console.log('Will use terms from following fields in objects to calculate stopwords: ' + opts.extractionKeys)
  } else {
    console.log('Will use terms from all object values to calculate stopwords')
  }
}

console.dir(opts)

fs.createReadStream(file)
  .on('error', function(err) {
    console.log('An error occured, trying to read: ' + file + '\n' + err)
  })
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
    console.log('Processing document #' + opts.docCount)
  })
  .on ('finish', function () {
    swt.documentFrequency(opts.max)
    calculationJSON = JSON.stringify(opts.calculationArray)
    stopwordJSON = JSON.stringify(opts.stopwordArray)
    fs.writeFileSync('stopwords-calculation.json', calculationJSON)
    fs.writeFileSync('stopwords.json', stopwordJSON)
    console.log('Finished processing')
  })
