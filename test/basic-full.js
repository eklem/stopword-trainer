const test           = require('tape')
const fs             = require('fs')
const swt            = require('../index.js')

let reutersFull = './node_modules/reuters-21578-json/data/fullFileStream/full.str'
opts = {
    docCount: 0,
    stopwordArray: [],
    calculationArray: [],
    max: 100
}
fs.createReadStream(reutersFull)
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
  })
  .on ('end', function () {
    swt.documentFrequency(opts.max)
    test('100 stopwords calculated from full.str', (assert) => {
      const expected = ["the","of","to","said","reuter","and","a","in","for","it","mln","usa","dlrs","on","mar","is","its","from","by","pct","at","will","be","with","that","year","was","s","has","vs","an","u","as","he","inc","billion","company","would","not","which","cts","corp","new","apr","but","are","net","this","have","bank","were","one","last","had","or","also","market","two","stock","up","about","co","earn","shares","share","they","been","trade","loss","may","shr","more","first","april","after","sales","dlr","oil","march","over","debt","than","other","exchange","interest","government","three","japan","group","no","banks","international","per","price","told","prices","their","qtr","some","under"]
      assert.deepEqual(opts.stopwordArray, expected)
      assert.end()
    })
  })


