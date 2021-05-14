// just for development
const wnn = require('words-n-numbers')
const document = 'er et amerikansk band som ble dannet i 1996 Medlemmene kom fra bandene The Yah Mos Black Liquorice og Popesmashers","Etter en turne sammen bestemte Black Liquorice og Popesmashers seg for å blande førstnevntes disco og funkstil med sistnevntes støyende aggressivitet og slik ble født Bandets navn var inspirert av tekstingen på filmen Gudene må være gale hvor klikkelydene som buskmennene lagde ble skrevet med et  I det internasjonale fonetiske alfabetet er postalveolære klikkkonsonanter representert med  som ikke er et utropstegn men et pipetegn med en prikk under","Deres selvtitulerte debutalbum kom ut i 2000 Oppfølgeren kom i 2003 er kjent for sine katarsiske liveshow'
const words = wnn.extract(document, { toLowercase: true })

// actual code for the module
const calculations = []
const wordObjStarter = {
  word: '',
  inCorpus: 1,
  // if inThisDoc is set to false, set to true and increase ++inDocs
  inThisDocAlready: true,
  inDocs: 1,
  stopWordiness: 0
}

const countWords = function (words, calculations) {
  // reset inThisDocAlready to false before new document of words
  if (calculations.length > 0) {
    calculations.forEach(word => {
      word.inThisDocAlready = false
    })
  }
  // do stuff on each word in words
  words.forEach((thisWord) => {
    let wordObj = {}
    const i = calculations.findIndex(({ word }) => word === thisWord)
    // checks if word object is undefined in calculations
    if (i === -1) {
      console.log('index - not earlier: ' + i)
      // populate wordObj from thisWord + wordObjStarter
      wordObj = { ...wordObjStarter, word: thisWord }
      calculations = [...calculations, wordObj]
    } else {
      // index i found - alter word object
      // alter incCorpus: inCorpus++
      calculations[i].inCorpus++
      // check if not inThisDocAlready
      //   --> inThisDocAready = true
      //   --> indDocs++
      if (!calculations[i].inThisDocAlready) {
        calculations[i].inThisDocAlready = true
        calculations[i].inDocs++
      }
      console.log('index - earlier: ' + i + ' ' + thisWord)
    }
  })
  console.log(calculations.length)
  console.log(words.length)
  console.log(calculations)
}

const documentFrequency = function () {
  // stuff here
}

console.log(JSON.stringify(words))
console.log(wordObjStarter)
console.log(calculations)
console.log(countWords)
console.log(documentFrequency)

countWords(words, calculations)
