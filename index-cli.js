#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const swt = require('./index.js')

opts = {
  docCount: 0,
  stopwordArray: [],
  calculationArray: [],
  max: 0
}

/* program construction */
program
  .version('0.1.2')
  .option('-f --file <file>', 'The data file to be processed on a line delimited, streaming JSON format')
  .option('-m --max [number-of-stopwords]', 'The max number of stopwords to store. All if not defined')
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
  console.dir(opts)
}

fs.createReadStream(file)
  .on('error', function(err) {
    console.log('An error occured, trying to read: ' + file + '\n' + err)
  })
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
    console.log('Processing document #' + opts.docCount)
  })
  .on ('end', function () {
    swt.documentFrequency(opts.max)
    calculationJSON = JSON.stringify(opts.calculationArray)
    stopwordJSON = JSON.stringify(opts.stopwordArray)
    fs.writeFileSync('stopwords-calculation.json', calculationJSON)
    fs.writeFileSync('stopwords.json', stopwordJSON)
    console.log('Finished processing')
  })


 
  
