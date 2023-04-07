function getRandomNumber(from, to) {
  if (from < 0 || to < 0) {
    return false;
  }
  if (typeof from !== 'number' || typeof to !== 'number') {
    return false;
  }
  if (from === to) {
    return from;
  }
  if (from > to) {
    [from, to] = [to, from];
  }
  return Math.round(Math.random() * (to - from) + from);
}
function lineMaxLength(line, maxLength) {
  return line.length < maxLength;
}
const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};
function createUniqueRandomId (from, to) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomNumber(from, to);
    if (previousValues.length >= (to - from + 1)) {
      return false
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(from, to);
    }
    previousValues.push(currentValue);
    return currentValue;
  }
}
export {createUniqueRandomId, getRandomArrayElement, getRandomNumber};
