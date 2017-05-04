var months = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ]

var StringBuilder = function (value) {
    this.strings = new Array();
    this.append(value);
}

StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

StringBuilder.prototype.clear = function () {
    this.strings.length = 0;
}

StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}

var addEntry = function(sb, stationID, year, monthNum, date, e, dummy) {
  // sb.append('\tHeatMapData.insert({') /*JS Fixture*/
  sb.append('db.getCollection(\'heat-map-data\').insert({') /*Mongo Shell*/

  //stationID
  sb.append('\n\t\tstationID: \'')
  sb.append(stationID)

  //month
  sb.append('\',\n\t\tmonth: ')
  sb.append(monthNum)

  //day
  sb.append(',\n\t\tday: ')
  sb.append(date)

  //year
  sb.append(',\n\t\tyear: ')
  sb.append(year)

  //tempHigh
  sb.append(',\n\t\ttempHigh: ')
  sb.append(e.tempHigh.substring(0, e.tempHigh.length - 3))

  //tempAvg
  sb.append(',\n\t\ttempAvg: ')
  sb.append(e.tempAvg.substring(0, e.tempAvg.length - 3))

  //tempLow
  sb.append(',\n\t\ttempLow: ')
  sb.append(e.tempLow.substring(0, e.tempLow.length - 3))

  //rain
  sb.append(',\n\t\train: ')
  sb.append(e.rain.substring(0, e.rain.length - 3))

  //dummy boolean
  sb.append(',\n\t\tdummy: ')
  sb.append(dummy ? 'true' : 'false')

  sb.append('\n\t})\n')

  return sb
}

var pad = function(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

var getStationIndex = function(stationID) {
  var stations = [
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
    'IWESTERN635']

    var i = null

    stations.forEach((element, index) => {
      if (element == stationID) {
        i = index
      }
    })

    return i
}

var addHeatmapEntry = function(sb, stationID, year, monthNum, date, e, dummy) {
  sb.append(year)
  sb.append('-')
  sb.append(pad(monthNum, 2))
  sb.append('-')
  sb.append(pad(date, 2))
  sb.append(',')
  if (getStationIndex(stationID) == 0) {
    sb.append('0')
  } else {
    sb.append(getStationIndex(stationID))
  }
  sb.append(',')
  //Rain
  sb.append(e.rain.substring(0, e.rain.length - 3))

  sb.append('\n')


  return sb
}

module.exports = function(stationID, data) {
  var year = 2016
  var month = 'Jan'
  var monthNum = 1
  var date = 1

  var sb = new StringBuilder()
  // sb.append('if (HeatMapData.find().count() === 0) {\n')

  data.forEach(function(e, index) {
    if (months.indexOf(e.date) > -1) {
      month = e.date

      // 1-INDEXED
      monthNum = months.indexOf(e.date) + 1
      date = 1
    } else if (e.date == '2017') {
      year = 2017
    } else if (parseInt(e.date) > 0 && parseInt(e.date) < 32) {
      var dateFromFile = parseInt(e.date)

      //Advance date if there are missing entries
      while (dateFromFile != date) {
        // console.log('Missing entry on ' + month + ' ' + date)

        //Create dummy entry
        sb = addHeatmapEntry(sb, stationID, year, monthNum, date, {tempHigh: '0   ', tempAvg: '0   ', tempLow: '0   ', rain: '0   '}, true)
        date++
      }

      // console.log('Found entry for ' + month + ' ' + date)

      //Create real entry
      sb = addHeatmapEntry(sb, stationID, year, monthNum, date, e, false)

      date++
    }
  })

  // sb.append('}')

  return sb.toString()
}


/***
if (HeatMapData.find().count() === 0) {
  HeatMapData.insert({
    month: 1
    day: 1
    year: 2016,
    tempHigh: 1,
    tempAvg: 1,
    tempLow: 1,
    rain:

  })
}


*/
