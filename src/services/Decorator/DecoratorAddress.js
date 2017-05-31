export function getValue(address) {
  return address ? Object.keys(address).map(key => {
    return address[key];
  }).join(', ') : '';
}
