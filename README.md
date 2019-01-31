# stopword-trainer

`stopword-trainer` is a node module for creating stopword lists based on your own set of documents. These lists can easily be used together with the [`stopword`](https://github.com/fergiemcdowall/stopword/) module to strip stopwords from an input text.

[![NPM version](http://img.shields.io/npm/v/stopword-trainer.svg?style=flat)](https://npmjs.org/package/stopword-trainer)
[![NPM downloads](http://img.shields.io/npm/dm/stopword-trainer.svg?style=flat)](https://npmjs.org/package/stopword-trainer)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Build Status](https://travis-ci.org/eklem/stopword-trainer.svg?branch=master)](https://travis-ci.org/eklem/stopword-trainer)
[![Greenkeeper badge](https://badges.greenkeeper.io/eklem/stopword-trainer.svg?style=flat)](https://greenkeeper.io/)

## Reasons for generating your own list of stopwords?

### Your language is not yet supported by stopword
Stopword has a lot of languages included, but it very well might be that your language is still not there.

### Better list of stopwords for your language
Stopword has your language included, but you think the quality could be better, or the list of stopwords to be longer.

### Tribal language
In any group of people you will get a sort of tribal language, be it a big corporation, a gaming community or a research journal. To get a stopword that works well here, you need to train it on actual words used within the group.

### Need help?
If you're trying to make a list of stopwords but have some problems, [open an issue](https://github.com/eklem/stopword-trainer/issues/new), and we will try to help.

## Usage

## Javascript example
```javascript
const swt = require('stopword-trainer')

fs.createReadStream(dataStream)
  .on('error', function(err) {
    // err
  })
  .pipe(swt.ndjson.parse())
  .on('data', function (obj) {
    swt.termFrequency(obj)
  })
  .on ('end', function () {
    swt.documentFrequency(opts.max)
    // data.stopwordArray and data.calculationArray populated
  })
```

### Options
* `max` - Max number of stopwords to be stored in `data.stopwordArray`. Defaults to 100
* `extractionKeys` - Array of keys for which fields to process from objects. Defaults to all fields (all values for end keys).

```javascript
opts = {
  max: 0,
  extractionKeys: []
}
```

### Console client
```
  $index-cli [options]


  Options:

    -V, --version                   output the version number
    -f --file <file>                the data file to be processed on a line delimited, streaming JSON format
    -k --keys [object keys]         comma-separated list of object keys for all object values to be processed
    -m --max [number-of-stopwords]  the max number of stopwords to store. All if not defined
    -h, --help                      output usage information
  
  Example:
  
    ./index-cli.js -f justTen.str -k body -m 200
```

### Input
Takes a set of line delimited JSON objects (documents) as input and wanted length of stopwordlist. Stopword-trainer is using [ndjson](https://github.com/maxogden/ndjson) to cut a newline delimited JSON into JSON objects: [Example stream file](https://github.com/fergiemcdowall/reuters-21578-json/blob/master/data/fullFileStream/justTen.str).

### Output
Outputs `stopwordArray`, sorted from most likely to least likely. Needs to be sliced before use.

## Calculation of word frequency
A simple version of TF-DF (Term Frequency - Document Frequency). The math on how stop-worthy a term is:
```javascript
stopWordiness = (termInCorpus / totDocs) * (1 / (Math.log(totDocs/(termInDocs - 1))))
```
