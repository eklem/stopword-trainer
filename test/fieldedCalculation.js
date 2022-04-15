const swt = require('../index.js')
const test = require('ava')
const wnn = require('words-n-numbers')
const json = require('../node_modules/reuters-21578-json/data/full/reuters-000.json')

const wordsCounted = { docs: 0, words: [] }
const docsWordsArray = []

const documents = json.map(function (obj) {
  return obj.body
})
console.log(documents)

documents.forEach(document => {
  if (document !== undefined) {
    document = wnn.extract(document, { regex: [wnn.words, wnn.numbers], toLowercase: true })
    docsWordsArray.push(document)
  }
})

docsWordsArray.forEach((document) => {
  if (document !== undefined) {
    swt.countWords(document, wordsCounted)
  }
})

swt.stopwordienessCalc(wordsCounted)

test('100 stopwords calculated on body-field in reuters-000.json (1000 documents)', (assert) => {
  const stopwords = swt.getStopwords(wordsCounted.words).slice(0, 100)
  const expected = ['reuter', 'the', 'of', 'said', 'to', 'and', 'a', 'in', 'for', 'it', 'mln', 'dlrs', 'on', 'is', 'from', 'its', '1', 'will', 'pct', 'with', 'be', 'at', 'by', 'year', 'was', 'that', '000', 'vs', '2', 'has', 'an', 's', 'as', 'billion', '3', 'cts', 'u', 'new', 'not', '5', 'which', 'company', 'would', 'he', '4', 'but', 'one', 'this', 'are', 'inc', 'last', 'have', 'were', 'corp', '1986', 'net', 'two', 'market', '8', 'bank', '6', 'march', 'or', '7', 'had', 'about', 'they', 'also', 'up', 'share', 'been', 'shr', 'government', 'stock', 'after', '9', '10', 'loss', 'over', '1987', 'co', 'shares', 'than', 'more', 'other', 'no', 'prices', 'oil', '1985', 'per', 'debt', 'exchange', 'first', 'three', 'january', 'week', 'banks', 'if', 'group', '15']
  assert.deepEqual(stopwords, expected)
})
