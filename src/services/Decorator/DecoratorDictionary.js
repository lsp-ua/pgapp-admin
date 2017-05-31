export function getValue(keys, dictionary, defaultValue = 'N/A') {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  let searchResult = keys && dictionary ? keys.map(function(key) {
      let element = dictionary.find(el => el.uuid === key);
      return element ? element.name : null;
    }).join(', ') : null;

  return searchResult ? searchResult : defaultValue;
}
