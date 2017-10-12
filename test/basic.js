const test           = require('tape')
const fs             = require('fs')
const swt            = require('../index.js')

let reutersJustTen = './node_modules/reuters-21578-json/data/fullFileStream/justTen.str'
fs.createReadStream(reutersJustTen)
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
  })
  .on ('end', function () {
    swt.documentFrequency(10)
    test('10 stopwords calculated from justTen.str', (assert) => {
      const expected = ["the","to","and","of","feb","reuter","said","a","dlrs","for"]
      assert.deepEqual(data.stopwordArray, expected)
      assert.end()
    })
  })
