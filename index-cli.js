#!/usr/bin/env node

const fs = require('fs')
const ndjson = require('ndjson')
const swt = require('./index.js')

let dataStream = './node_modules/reuters-21578-json/data/fullFileStream/full.str'
let opts = {
  docCount: 0,
  calculationArray: [],
  stopwordArray: [],
}

fs.createReadStream(dataStream)
  .on('error', function(err) {
    console.log('Oops, an error: ' + err)
  })
  .pipe(ndjson.parse())
  .on('data', function (obj) {
    opts.docCount++
    swt.termFrequency(obj, opts.docCount, opts.calculationArray)   
  })
  .on('end', function () {
    swt.documentFrequency(opts.docCount, opts.calculationArray)
  })

  

