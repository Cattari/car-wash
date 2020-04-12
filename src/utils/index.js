export const noop = () => {};

export const zoomToPositionDelta = (zoom) =>
  Math.exp(Math.log(360) - zoom * Math.LN2);

export const getArrayMiddleElement = (arr) =>
  arr[Math.round((arr.length - 1) / 2)];

export const addressWithoutPlusCode = (address) => {
  if (!address) {
    return '';
  }
  return address
    .split(' ')
    .filter((item) => !item.includes('+'))
    .join(' ');
};
