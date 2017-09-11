# stopword-trainer
`stopword-trainer` is going to be a node module for creating stopword lists based on your own set of documents. These lists can easily be used together with the [`stopword`](/fergiemcdowall/stopword/) module to strip stopwords from an input text.


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
Base it on the research paper: [Automated Stopwords Identification in Punjabi Documents](http://ijoes.vidyapublications.com/paper/Vol8/15-Vol8.pdf) by Rajeev Puri, Dr. R.P.S. Bedi and Dr. Vishal Goyal. It shows a method combining frequency of a word in a document corpus and frequency of that same word in a single document.
