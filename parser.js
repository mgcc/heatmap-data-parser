var c2j = require('csvtojson')
var processor = require('./lib/process')

var files = ['ICALABAR18']

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

        fs.writeFile('data/' + element + '.txt', output, function(err) {
          if (err) {
            console.log(err)
          } else {
            console.log('Finished ' + element + '.txt')
          }
        })
      }
      console.log('Done')
    })
  })
}

// readFromFile(file)
readFiles(files)

