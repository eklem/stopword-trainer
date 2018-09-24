const test           = require('tape')
const fs             = require('fs')
const swt            = require('../index.js')

let reuters000 = './node_modules/reuters-21578-json/data/fullFileStream/000.str'
opts.extractionKeys = ['body']

fs.createReadStream(reuters000)
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
  })
  .on ('end', function () {
    swt.documentFrequency(100)
    test('100 stopwords calculated on body-field in 000.str (1000 documents)', (assert) => {
      const expected = [ '0', 'the', 'of', 'reuter', 'to', 'said', 'and', 'a', 'in', 'for', 'it', 'mln', 'dlrs', 'on', 'is', 'from', 'its', '1', 'will', 'pct', 'with', 'be', 'at', 'by', 'year', 'was', 'that', '000', 'vs', '2', 'has', 'an', 's', 'as', 'billion', 'cts', '3', 'u', 'new', 'not', '5', 'which', 'company', 'would', 'he', '4', 'but', 'one', 'this', 'are', 'inc', 'last', 'have', 'were', '1986', 'corp', 'net', 'two', 'market', '8', 'bank', '6', 'march', 'or', '7', 'had', 'about', 'they', 'also', 'up', 'share', 'been', 'shr', 'government', 'stock', 'after', '9', '10', 'loss', '1987', 'over', 'co', 'shares', 'than', 'more', 'other', 'no', 'prices', 'oil', '1985', 'per', 'debt', 'exchange', 'first', 'three', 'january', 'week', 'banks', 'if', 'group' ]
      assert.deepEqual(data.stopwordArray, expected)
      assert.end()
    })
  })
