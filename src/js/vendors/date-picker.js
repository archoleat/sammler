import datepicker from 'js-datepicker'

const initCalendar = () => {
  if (document.querySelector('[data-datepicker]')) {
    datepicker('[data-datepicker]', {
      customDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      customMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'July',
        'Aug',
        'Sen',
        'Oct',
        'Nov',
        'Dec'
      ],
      overlayButton: 'Apply',
      overlayPlaceholder: 'Year (4 digits)',
      startDay: 1,
      formatter: (input, date) => {
        const value = date.toLocaleDateString()

        input.value = value
      }
    })
  }
}

export { initCalendar }
