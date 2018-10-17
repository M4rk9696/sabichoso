/* eslint-env mocha */
const assert = require('assert')
const datesHelper = require('../../helpers/dates-helper')

const days = {
  0: {
    english: 'Sunday',
    spanish: 'Domingo'
  },
  1: {
    english: 'Monday',
    spanish: 'Lunes'
  },
  2: {
    english: 'Tuesday',
    spanish: 'Martes'
  },
  3: {
    english: 'Wednesday',
    spanish: 'Miércoles'
  },
  4: {
    english: 'Thursday',
    spanish: 'Jueves'
  },
  5: {
    english: 'Friday',
    spanish: 'Viernes'
  },
  6: {
    english: 'Saturday',
    spanish: 'Sábado'
  }
}

const months = {
  0: {
    english: 'January',
    spanish: 'Enero'
  },
  1: {
    english: 'February',
    spanish: 'Febreo'
  },
  2: {
    english: 'March',
    spanish: 'Marzo'
  },
  3: {
    english: 'April',
    spanish: 'Abril'
  },
  4: {
    english: 'May',
    spanish: 'Mayo'
  },
  5: {
    english: 'June',
    spanish: 'Junio'
  },
  6: {
    english: 'July',
    spanish: 'Julio'
  },
  7: {
    english: 'August',
    spanish: 'Agosto'
  },
  8: {
    english: 'September',
    spanish: 'Septimebre'
  },
  9: {
    english: 'October',
    spanish: 'Octubre'
  },
  10: {
    english: 'November',
    spanish: 'Noviembre'
  },
  11: {
    english: 'December',
    spanish: 'Diciembre'
  }
}

const hours = {
  0: '12',
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
  9: '09',
  10: '10',
  11: '11',
  12: '12',
  13: '01',
  14: '02',
  15: '03',
  16: '04',
  17: '05',
  18: '06',
  19: '07',
  20: '08',
  21: '09',
  22: '10',
  23: '11'
}

describe('Brower helper', () => {
  it('should be able to match days of week correctly', () => {
    for (let day in days) {
      assert.strictEqual(
        datesHelper.getDayString(
          new Date(`${days[day].english} Oct ${14 + Number(day)} 2018`).getDay()
        ),
        days[day].spanish
      )
    }
  })

  it('should be able to match months correctly', () => {
    for (let month in months) {
      assert.strictEqual(
        datesHelper.getMonthString(
          new Date(`${months[month].english} 14 2018`).getMonth()
        ),
        months[month].spanish
      )
    }
  })

  it('should be able to convert from 24 hour format correctly', () => {
    for (let hour in hours) {
      assert.strictEqual(datesHelper.getHour(Number(hour)), hours[hour])
    }
  })

  it('should be able to convert minutes correctly', () => {
    assert.strictEqual(datesHelper.getMinutes(0), '00')
    assert.strictEqual(datesHelper.getMinutes(1), '01')
    assert.strictEqual(datesHelper.getMinutes(10), '10')
    assert.strictEqual(datesHelper.getMinutes(20), '20')
    assert.strictEqual(datesHelper.getMinutes(59), '59')
  })
})
