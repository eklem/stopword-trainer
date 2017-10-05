#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const swt = require('./index.js')

opts = {
  docCount: 0,
  stopwordArray: [],
  calculationArray: []
}

/* program construction */
program
  .version('0.1.1')
  .option('-d, --data [docs.str]', 'The data to be processed on a streaming line delimited JSON format')
  .parse(process.argv)

if (program.data) {
  console.log('Data: %j ', program.data)
  var data = program.data
  }
              

fs.createReadStream(data)
  .on('error', function(err) {
    console.log('Okay, an error: ' + err)
  })
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    opts.docCount++
    swt.termFrequency(obj, opts.docCount, opts.calculationArray)
  })
  .on ('end', function () {
    swt.documentFrequency(opts.docCount, opts.calculationArray)
    // opts.stopwordArray and opts.calculationArray populated
    calculationJSON = JSON.stringify(opts.calculationArray)
    stopwordJSON = JSON.stringify(opts.stopwordArray)
    fs.writeFileSync('stopwords-calculation.json', calculationJSON)
    fs.writeFileSync('stopwords.json', stopwordJSON)
  })


 
  
