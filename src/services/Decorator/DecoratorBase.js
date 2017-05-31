export function concatObject(value, separator = ' ') {
  return value ? Object.keys(value).map(key => {
    return value[key];
  }).join(separator) : '';
}

export function concatValues(values, separator = ' ') {
  return values ? values.map(value => {
      return value;
    }).join(separator) : '';
}
