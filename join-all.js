var fs = require('node-fs')

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



var readFiles = function(files) {
  var data = ''

  files.forEach(function(element, index) {
    data = data + fs.readFileSync('output/' + element+'.txt', 'utf-8')

  })

  fs.writeFile('output/ALL.txt', data, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}

readFiles(files)