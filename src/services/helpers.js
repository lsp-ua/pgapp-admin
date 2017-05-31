export function getObjValue(obj, key, defaultValue = '') {
  try {
    let keys = key.split('.');
    let result = obj[keys.shift()];
    while(result && keys.length) result = result[keys.shift()];

    return result;
  } catch (error) {
    return defaultValue;
  }
}

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
