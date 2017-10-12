const test           = require('tape')
const fs             = require('fs')
const swt            = require('../index.js')

let reuters000 = './node_modules/reuters-21578-json/data/fullFileStream/000.str'
opts = {
    docCount: 0,
    stopwordArray: [],
    calculationArray: [],
    max: 100,
    extractionKeys: []
}
fs.createReadStream(reuters000)
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
  })
  .on ('end', function () {
    swt.documentFrequency(opts.max)
    test('100 stopwords calculated on all content from 000.str (1000 documents)', (assert) => {
      const expected = ['the', 'of', 'reuter', 'to', 'said', 'and', 'in', 'a', 'mar', 'for', 'it', 'mln', 'dlrs', 'on', 'usa', 'from', 'is', 'its', 'pct', 'will', 'with', 'at', 'be', 'by', 'year', 'was', 'that', 's', 'vs', 'has', 'u', 'an', 'as', 'new', 'billion', 'inc', 'cts', 'not', 'company', 'which', 'corp', 'would', 'he', 'one', 'but', 'this', 'net', 'are', 'last', 'have', 'bank', 'were', 'feb', 'two', 'market', 'march', 'or', 'had', 'about', 'up', 'they', 'also', 'earn', 'share', 'stock', 'been', 'government', 'loss', 'shr', 'after', 'co', 'shares', 'over', 'oil', 'more', 'no', 'than', 'prices', 'banks', 'debt', 'other', 'week', 'january', 'first', 'three', 'exchange', 'group', 'per', 'international', 'sales', 'expected', 'if', 'interest', 'five', 'february', 'dlr', 'under', 'some', 'their', 'april']
      assert.deepEqual(opts.stopwordArray, expected)
      assert.end()
    })
  })
