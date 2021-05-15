// just for development
const wnn = require('words-n-numbers')
const documents = [
  'er et amerikansk band som ble dannet i 1996 Medlemmene kom fra bandene The Yah Mos Black Liquorice og Popesmashers","Etter en turne sammen bestemte Black Liquorice og Popesmashers seg for å blande førstnevntes disco og funkstil med sistnevntes støyende aggressivitet og slik ble født Bandets navn var inspirert av tekstingen på filmen Gudene må være gale hvor klikkelydene som buskmennene lagde ble skrevet med et  I det internasjonale fonetiske alfabetet er postalveolære klikkkonsonanter representert med  som ikke er et utropstegn men et pipetegn med en prikk under","Deres selvtitulerte debutalbum kom ut i 2000 Oppfølgeren kom i 2003 er kjent for sine katarsiske liveshow',
  'Do you want some action  Live From Barcelona 1990 er en video med Tina Turner som ble gitt ut i 19901 Videoen inneholder en konsert som var en del av henns Foreign Affair Farewell Tour'
]
const docsArray = [
  wnn.extract(documents[0], { toLowercase: true }),
  wnn.extract(documents[1], { toLowercase: true })
]

// actual code for the module
let wordsCounted = {
  docs: 0,
  words: []
}
const wordObjStarter = {
  word: '',
  inCorpus: 1,
  // if inThisDoc is set to false, set to true and increase ++inDocs
  inThisDocAlready: true,
  inDocs: 1,
  stopWordiness: 0
}

// ### Two functions for training stopword lists
// ###   A: countWords - populate wordsArray
// ###   B: stopwordienessCalc - calculate stopwordiness of each word
// ###   C: getStopwords - weed out redlisted words and cut off


// ### A: Create calculation basis
const countWords = function (words, wordsCounted) {
  // count docs
  wordsCounted.docs++
  // reset inThisDocAlready to false before new document of words
  if (wordsCounted.words.length > 0) {
    wordsCounted.words.forEach(word => {
      word.inThisDocAlready = false
    })
  }
  // do stuff on each word in words
  words.forEach((thisWord) => {
    let wordObj = {}
    const i = wordsCounted.words.findIndex(({ word }) => word === thisWord)
    // checks if word object is undefined in wordsCounted
    if (i === -1) {
      // console.log('index - not earlier: ' + i)
      // populate wordObj from thisWord + wordObjStarter
      wordObj = { ...wordObjStarter, word: thisWord }
      wordsCounted.words = [...wordsCounted.words, wordObj]
    } else {
      // index i found - alter word object
      // alter incCorpus: inCorpus++
      wordsCounted.words[i].inCorpus++
      // check if not inThisDocAlready
      //   --> inThisDocAready = true
      //   --> indDocs++
      if (!wordsCounted.words[i].inThisDocAlready) {
        wordsCounted.words[i].inThisDocAlready = true
        wordsCounted.words[i].inDocs++
      }
      // console.log('index - earlier: ' + i + ' ' + thisWord)
    }
  })
  // console.log(wordsCounted.words.length)
  // console.log(words.length)
  // return wordsCounted
}

// ###   B: calculate stopwordiness of each word
const stopwordienessCalc = function (wordsCounted) {
  wordsCounted.words.forEach(wordObj => {
    wordObj.stopWordiness = (wordObj.inCorpus / wordsCounted.docs) * (1 / (Math.log(wordsCounted.docs / (wordObj.inDocs - 1 ))))
  })
  wordsCounted.words.sort((a, b) => parseFloat(b.stopWordiness) - parseFloat(a.stopWordiness));
}

const getStopwords = function () {
  // ###   C: weed out redlisted words and cut off to desired amount of stopwords
}

// console.log(JSON.stringify(words))
// console.log(wordObjStarter)
// console.log(wordsCounted)
// console.log(countWords)
// console.log(stopwordienessCalc)
// console.log(docsArray)

docsArray.forEach((document) => {
  console.log(document)
  countWords(document, wordsCounted)
})
// console.log(wordsCounted)



stopwordienessCalc(wordsCounted)
console.log(wordsCounted)