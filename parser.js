var c2j = require('csvtojson')
var processor = require('./lib/process')

var files = [
  'IBICOLGU2',
  'ICAGAYAN2',
  'ICAGAYAN3',
  'ICALABAR18',
  'ICALABAR25',
  'ICENTRAL91',
  'ICENTRAL94',
  'IDAVAORE19',
  'IMIMAROP6',
  'IMIMAROP7',
  'IMIMAROP8',
  'INORTHER117',
  'INORTHER86',
  'IWESTERN596',
  'IWESTERN635',
  'IZAMBOAN4'
]

var file = 'data/sample.csv'

var readFromFile = function(file) {
  var data = []

  c2j().fromFile(file)
    .on('json', function(jsonObj) {
      // console.log(jsonObj)
      data.push(jsonObj)
    })
    .on('done', function(err) {
      if (err) {
        console.log(err)
      }
      else {
        processor(data)
      }
      console.log('Done')
    })
}

var readFiles = function(files) {

  files.forEach(function(element,  index) {
    var data = []

  c2j().fromFile('data/' + element + '.csv')
    .on('json', function(jsonObj) {
      data.push(jsonObj)
    })
    .on('done', function(err) {
      if (err) {
        console.log(err)
      }
      else {
        var output = processor(element, data)

        var fs = require('node-fs')

        fs.writeFile('output/' + element + '.txt', output, function(err) {
          if (err) {
            console.log(err)
          } else {
            console.log('Finished ' + element + '.txt')
          }
        })
      }
    })
  })
}

// readFromFile(file)
readFiles(files)

