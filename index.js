// just for development
const wnn = require('words-n-numbers')
const document = 'er et amerikansk band som ble dannet i 1996 Medlemmene kom fra bandene The Yah Mos Black Liquorice og Popesmashers","Etter en turne sammen bestemte Black Liquorice og Popesmashers seg for å blande førstnevntes disco og funkstil med sistnevntes støyende aggressivitet og slik ble født Bandets navn var inspirert av tekstingen på filmen Gudene må være gale hvor klikkelydene som buskmennene lagde ble skrevet med et  I det internasjonale fonetiske alfabetet er postalveolære klikkkonsonanter representert med  som ikke er et utropstegn men et pipetegn med en prikk under","Deres selvtitulerte debutalbum kom ut i 2000 Oppfølgeren kom i 2003 er kjent for sine katarsiske liveshow'
const words = wnn.extract(document, { toLowercase: true })

// actual code for the module
// let calculationArray = []
const wordObjStarter = {
  word: '',
  inCorpus: 1,
  // if inThisDoc is set to false, set to true and increase ++inDocs
  inThisDoc: false,
  inDocs: 1,
  stopWordiness: 0
}
let calculations = []

const countWords = function (words, calculations) {
  // do stuff on each word in words
  // array1.at(index) <-- not sure if I need it
  words.forEach((thisWord) => {
    let wordObj = {}
    if (calculations.find(({ word }) => word === thisWord)) {
      // if find word in calculations, alter
    } else {
      // if nod populate wordObj from word + wordObjStarter
      wordObj = { ...wordObjStarter, word: thisWord }
      calculations = [...calculations, wordObj]
    }
    console.log(calculations)
    // push wordObj to calculations
  })
  return calculations
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
