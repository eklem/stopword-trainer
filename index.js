// ### Four functions for training stopword lists
// ###   A: countWords - populate wordsArray
// ###   B: stopwordienessCalc - calculate stopwordiness of each word
// ###   C: getStopwords - get only words with stopWordiness and check against notRedlisted
// ###   D: notRedlisted - helper function to check if word is not redlisted

// word object when the word is undefined
const wordObjStarter = {
  word: '',
  inCorpus: 1,
  // if inThisDoc is set to false, set to true and increase ++inDocs
  inThisDocAlready: true,
  inDocs: 1,
  stopWordiness: 0
}

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
    }
  })
}

// ### B: calculate stopwordiness of each word
const stopwordienessCalc = function (wordsCounted) {
  wordsCounted.words.forEach(wordObj => {
    wordObj.stopWordiness = (wordObj.inCorpus / wordsCounted.docs) * (1 / (Math.log(wordsCounted.docs / (wordObj.inDocs - 1))))
  })
  wordsCounted.words.sort((a, b) => parseFloat(b.stopWordiness) - parseFloat(a.stopWordiness))
}

// ### C: get only words with stopWordiness and check against notRedlisted
const getStopwords = function (wordsCounted, redlist) {
  // populate empty redlist if no redlist given
  if (redlist === undefined) {
    redlist = []
  }

  // reduce wordsCounted to only those with stopWordiness and notRedlisted
  const stopwords = wordsCounted.reduce((stopwordArr, word) => {
    if (word.stopWordiness > 0 && notRedlisted(word.word, redlist)) {
      stopwordArr.push(word.word)
    }
    return stopwordArr
  }, [])
  return stopwords
}

// ### D: notRedlisted - helper function to check if word is not redlisted
const notRedlisted = function (word, redlist) {
  // if found in index, return false
  if (redlist.indexOf(word) > -1) {
    return false
  } else {
    return true
  }
}

module.exports = {
  countWords: countWords,
  stopwordienessCalc: stopwordienessCalc,
  getStopwords: getStopwords
}
