var c2j = require('csvtojson')
var processor = require('./lib/process')

var files =
[
'IAMBOAN4',
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
'INORTHER86',
'INORTHER117',
'IWESTERN596',
'IWESTERN635',
// 'IDAVAORE20',
// 'IREGIONX6'
]

var readFiles = function(files) {

  files.forEach(function(element,  index) {
    var data = []

  c2j().fromFile('data2017/' + element + '.csv')
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

        fs.writeFile('output2017/' + element + '.txt', output, function(err) {
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

readFiles(files)

