export function arrayToObject(array, keyFn, valFn) {
  return array
    .map((x) => ({ [keyFn(x)]: valFn(x) }))
    .reduce((prev, curr) => ({ ...prev, ...curr }), {})
}

export function zip(a, b) {
  return a.map((x, i) => [x, b[i]])
}
