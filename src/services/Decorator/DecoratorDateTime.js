import moment from 'moment'

export function format(value, timeFormat = 'MM/DD/YYYY H:MM') {
  if (value) {
    return moment(value).format(timeFormat);
  } else {
    return '';
  }
}

export function getShiftArrivalTime(value) {
  return format(value, 'HH:mm');
}

export function getShiftExtendedArrivalTime(value) {
  return format(value, 'HH:mm A');
}

export function getShiftArrivalDate(value) {
  return format(value, 'L');
}
