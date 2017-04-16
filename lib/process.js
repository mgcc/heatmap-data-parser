var months = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ]

module.exports = function(data) {
  var month = 'Jan'
  var date = 1

  data.forEach(function(e, index) {
    if (months.indexOf(e.date) > -1) {
      console.log('Month change: ' + e.date)
      month = date
    } else if (parseInt(e.date) > 0 && parseInt(e.date)< 32) {
      console.log('Date change: ' + e.date)
    }
  })
}