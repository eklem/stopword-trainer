const fs = require('fs')
const swt = require('./index.js')

let dataStream = './node_modules/reuters-21578-json/data/fullFileStream/full.str'
opts = {
  docCount: 0,
  stopwordArray: [],
  calculationArray: []
}

fs.createReadStream(dataStream)
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


 
  
