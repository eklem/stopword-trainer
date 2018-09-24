const test           = require('tape')
const fs             = require('fs')
const swt            = require('../index.js')

let reuters000 = './node_modules/reuters-21578-json/data/fullFileStream/000.str'
fs.createReadStream(reuters000)
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
  })
  .on ('end', function () {
    swt.documentFrequency(100)
    test('100 stopwords calculated on all content from 000.str (1000 documents)', (assert) => {
      const expected = [ '1', '3', '5', '4', '6', '1987', '0', 'the', 'of', 'reuter', 'to', 'said', 'and', 'in', 'a', 'mar', 'for', '22', 'it', 'mln', 'dlrs', 'on', 'usa', 'from', 'is', 'its', 'pct', 'will', 'with', 'at', 'be', 'by', 'year', 'was', 'that', '000', 's', 'vs', '2', 'has', 'u', 'an', 'as', 'new', 'billion', 'inc', 'cts', 'not', 'company', 'which', 'would', 'corp', 'he', 'one', 'but', 'this', 'net', 'are', '15', 'last', 'have', '16', '1986', 'feb', 'were', '10', 'two', 'market', 'bank', '8', '226', 'march', '7', 'or', 'had', '23', 'about', '12', '13', 'up', 'they', 'also', 'earn', 'share', 'stock', 'been', 'government', 'loss', 'shr', 'after', '31', '17', '9', '20', '11', 'co', 'shares', '25', '30', 'over' ]
      assert.deepEqual(data.stopwordArray, expected)
      assert.end()
    })
  })
