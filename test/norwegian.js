const swt = require('../index.js')
const test = require('ava')
const wnn = require('words-n-numbers')
let documents = require('../node_modules/dataset-misc/docs-no-nb-justTen.json')
const redlistNorwegianText = ['albumet', 'utgitt', 'skrevet', 'musikk', 'live', 'rolling', 'storbritannia', 'usa', 'dollar', 'amerikansk', 'band', 'inspirert', 'kjent', 'konsert', 'studioalbumet', 'records', 'time', 'american', 'norge', 'richard', 'uker', 'hit', 'desember', 'politiet']

const wordsCounted = { docs: 0, words: [] }
const docsWordsArray = []

documents = documents.map(function (obj) {
  const objArr = Object.values(obj)
  return objArr.join(' ')
})

documents.forEach(document => {
  document = wnn.extract(document, { regex: wnn.wordsNumbers, toLowercase: true })
  docsWordsArray.push(document)
})

docsWordsArray.forEach((document) => {
  swt.countWords(document, wordsCounted)
})

swt.stopwordienessCalc(wordsCounted)

test('25 stopwords calculated on docs-no-nb-justTen.json (10 documents)', (t) => {
  const expected = ['i', 'er', 'og', 'en', 'med', 'av', 'som', 'på', 'det', 'til', 'ble', 'ut', 'for', 'var', 'fra', 'de', 'et', 'the', 'ikke', 'albumet', 'den', 'at', 'to', 'kom', 'å']
  const actual = swt.getStopwords(wordsCounted.words).slice(0, 25)
  t.deepEqual(actual, expected)
})

test('All words with stopwordiness calculated on docs-no-nb-justTen.json, but some words redlisted', (t) => {
  const expected = ['i', 'er', 'og', 'en', 'med', 'av', 'som', 'på', 'det', 'til', 'ble', 'ut', 'for', 'var', 'fra', 'de', 'et', 'the', 'ikke', 'den', 'at', 'to', 'kom', 'å', 'han', 'seg', 'har', 'men', 'etter', '1', 'sammen', 'deres', 'gitt', 'før', 'hans', 'om', 'hvor', 'under', 'første', 'of', 'annet', 'denne', 'så', '2', 'mindre', 'både', '1982', 'and', 'alle', 'blir', 'mange', '1971', 'bestemte', '2003', 'del', 'out', 'over', 'mens', 'beste', 'gikk', 'noen', 'tredje', 'noe', 'bare', 'inn', 'få', 'sin', 'selv', 'siden', 'tok', 'dette', 'startet', 'finnes', 'samme', 'is', 'når', 'eller', 'også']
  const actual = swt.getStopwords(wordsCounted.words, redlistNorwegianText)
  t.deepEqual(actual, expected)
})
