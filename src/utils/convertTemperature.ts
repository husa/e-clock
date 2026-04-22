// export default (kelvin, units) =>
//   Math.round(units === 'c' ? kelvin - 273.15 : kelvin * 9 / 5 - 459.67);
export default (c: number, units: 'c' | 'f') => Math.round(units === 'c' ? c : (c * 9) / 5 + 32);
