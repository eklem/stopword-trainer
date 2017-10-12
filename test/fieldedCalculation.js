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
      const expected = ['the', 'of', 'reuter', 'to', 'said', 'and', 'a', 'in', 'for', 'it', 'mln', 'dlrs', 'on', 'is', 'from', 'its', 'will', 'pct', 'with', 'be', 'at', 'by', 'year', 'was', 'that', 'vs', 'has', 'an', 's', 'as', 'billion', 'cts', 'u', 'new', 'not', 'which', 'company', 'would', 'he', 'but', 'one', 'this', 'are', 'inc', 'last', 'were', 'have', 'bank', 'corp', 'net', 'two', 'market', 'march', 'or', 'had', 'about', 'they', 'also', 'up', 'share', 'been', 'shr', 'government', 'stock', 'after', 'loss', 'co', 'over', 'shares', 'than', 'more', 'other', 'no', 'banks', 'prices', 'oil', 'per', 'debt', 'exchange', 'first', 'three', 'january', 'week', 'if', 'group', 'sales', 'five', 'expected', 'their', 'under', 'international', 'april', 'interest', 'price', 'some', 'all', 'december', 'february', 'years', 'agreement']
      assert.deepEqual(data.stopwordArray, expected)
      assert.end()
    })
  })
