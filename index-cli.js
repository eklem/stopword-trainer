#!/usr/bin/env node

const fs = require('fs')
const ndjson = require('ndjson')
const swt = require('./index.js')

let dataStream = './node_modules/reuters-21578-json/data/fullFileStream/justTen.str'
let docCount = 0
let calculationArray = []
let stopwordArray = []
let obj = {}

fs.createReadStream(dataStream)
  .on('error', function(err) {
    console.log('Oops, an error: ' + err)
  })
  .pipe(ndjson.parse())
  .on('data', swt.termFrequency(obj, docCount, calculationArray))
  .on('end', swt.documentFrequency())

