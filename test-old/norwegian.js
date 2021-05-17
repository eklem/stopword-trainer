const test           = require('tape')
const fs             = require('fs')
const swt            = require('../index.js')

let norwegian = './node_modules/dataset-misc/docs-no-nb-justTen.str'
opts.extractionKeys = ['paragraphs']
fs.createReadStream(norwegian)
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
  })
  .on ('end', function () {
    swt.documentFrequency(25)
    test('25 stopwords calculated on paragraphs-field in docs-no-nb-justTen.str (10 documents)', (assert) => {
      const expected = ["i","er","og","med","en","0","av","som","på","det","til","ble","ut","for","var","fra","de","the","et","ikke","albumet","den","at","to","kom"]
      assert.deepEqual(data.stopwordArray, expected)
      assert.end()
    })
  })
