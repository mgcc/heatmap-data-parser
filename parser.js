var c2j = require('csvtojson')
var processor = require('./lib/process')

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

readFromFile(file)

