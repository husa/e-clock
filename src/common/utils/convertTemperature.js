export default (kelvin, units) =>
  Math.round(units === 'c' ? kelvin - 273.15 : kelvin * 9 / 5 - 459.67);
