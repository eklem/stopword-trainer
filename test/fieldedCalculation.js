const swt = require('../index.js')
const test = require('ava').default
const wnn = require('words-n-numbers')
const json = require('../node_modules/reuters-21578-json/data/full/reuters-000.json')

const wordsCounted = { docs: 0, words: [] }
const docsWordsArray = []
const regex = /[\r\n]+/g
const subst = ` `

const documents = json.map(function (obj) {
  return obj.body
})

documents.forEach(document => {
  if (document !== undefined) {
    document = document.replace(regex, subst)
    document = wnn.extract(document, { regex: wnn.wordsNumbers, toLowercase: true })
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
  const expected = ['reuter', 'the', 'of', 'said', 'to', 'and', 'a', 'in', 'for', 's', 'it', 'mln', 'dlrs', 'on', 'is', 'from', 'its', '1', 'will', 'pct', 'with', 'be', 'at', 'by', 'year', 'was', 'that', '000', 'vs', '2', 'has', 'an', 'as', 'company', 'billion', '3', 'cts', 'u', 'new', 'not', '5', 'which', 'would', 'he', '4', 'but', 'one', 'this', 'inc', 'are', 'corp', 'last', 'have', 'were', '1986', 'bank', 'net', 'two', 'market', '8', '6', 'march', 'or', '7', 'had', 'about', 'they', 'also', 'up', 'share', 'government', 'been', 'stock', 'shr', 'after', '9', '10', 'loss', 'co', 'over', '1987', 'shares', 'than', 'more', 'other', 'week', 'no', 'prices', 'oil', 'january', '1985', 'exchange', 'per', 'debt', 'first', 'three', 'banks', 'group', 'if', '15']
  assert.deepEqual(stopwords, expected)
})
