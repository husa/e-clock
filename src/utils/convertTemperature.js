// export default (kelvin, units) =>
//   Math.round(units === 'c' ? kelvin - 273.15 : kelvin * 9 / 5 - 459.67);
export default (c, units) =>
  Math.round(units === 'c' ? c : c * 9 / 5 + 32);
