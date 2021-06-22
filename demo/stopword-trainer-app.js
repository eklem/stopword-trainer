// Populating div with only meaningful words
const populateKeywords = function(result) {
  console.log('Boom')
  console.log(result)
  const node = document.createElement('span')
  node.innerHTML = result
  emptyElement('keywordsFound')
  document.getElementById('keywordsFound').appendChild(node)
}

// Listen to key up on headlinetext and initiate a headline parser
document.getElementById("headlinetext").onkeyup = function() {
  calculateKeywords()
}

// Listen to key up on bodytext and initiate a headline parser
document.getElementById("bodytext").onkeyup = function() {
  calculateKeywords()
}

// calculate keywords
const calculateKeywords = function () {
  var headlinetext = document.getElementById("headlinetext").value.split(' ')
  var bodytext = document.getElementById("bodytext").value.split(' ')
  console.log(headlinetext)
  console.log(bodytext)
  var importantKeywords = []
  var importantKeywords = ehp.findKeywords(sw.removeStopwords(headlinetext), bodytext);
  console.log('Keywords: ' + importantKeywords)
  populateKeywords(importantKeywords)
}

// Empty HTML element
const emptyElement = function (element) {
    document.getElementById(element).innerHTML = ''
}