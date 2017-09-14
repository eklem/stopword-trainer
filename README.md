# stopword-trainer
`stopword-trainer` is a node module for creating stopword lists based on your own set of documents. These lists can easily be used together with the [`stopword`](https://github.com/fergiemcdowall/stopword/) module to strip stopwords from an input text.

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Reasons for generating your own list of stopwords?

### Your language is not yet supported by stopword
Stopword has a lot of languages included, but it very well might be that your language is still not there.

### Better list of stopwords for your language
Stopword has your language included, but you think the quality could be better, or the list of stopwords to be longer.

### Tribal language
In any group of people you will get a sort of tribal language, be it a big corporation, a gaming community or a research journal. To get a stopword that works well here, you need to train it on actual words used within the group.

## Use
Commandline tool.

### Input
Takes a set of line delimited JSON objects (documents) as input and wanted length of stopwordlist.

### Output
Outputs an array of stopwords, sorted from most likely to least likely.

## Calculation of word frequency
... something TF-DF

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/stopword-trainer
[npm-version-image]: http://img.shields.io/npm/v/stopword-trainer.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/stopword-trainer.svg?style=flat
