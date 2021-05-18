const swt = require('../index.js')
const test = require('ava').default
const wnn = require('words-n-numbers')
const json = require('../node_modules/reuters-21578-json/data/justTen/justTen.json')

const wordsCounted = { docs: 0, words: [] }
const docsWordsArray = []
const regex = /[\r\n]+/g
const subst = ' '

const documents = json.map(function (obj) {
  const objArr = Object.values(obj)
  return objArr.join(' ')
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
  const stopwords = swt.getStopwords(wordsCounted.words).slice(0, 10)
  const expected = ['the', 'to', 'and', 'of', 'feb', '15', '1987', '26', 'reuter', 'said']
  assert.deepEqual(stopwords, expected)
})
