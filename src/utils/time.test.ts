import { format24Hours, prependZero } from './time';

describe('time', () => {
  describe('prependZero', () => {
    it('should prepend zero to numbers less than 10', () => {
      expect(prependZero(0)).toBe('00');
      expect(prependZero(5)).toBe('05');
      expect(prependZero(10)).toBe('10');
      expect(prependZero(15)).toBe('15');
    });
  });

  describe('format24Hours', () => {
    it('should format hours in 24-hour format', () => {
      expect(format24Hours(true, 0)).toBe(0);
      expect(format24Hours(true, 12)).toBe(12);
      expect(format24Hours(true, 23)).toBe(23);
    });

    it('should format hours in 12-hour format', () => {
      expect(format24Hours(false, 0)).toBe(12);
      expect(format24Hours(false, 1)).toBe(1);
      expect(format24Hours(false, 12)).toBe(12);
      expect(format24Hours(false, 23)).toBe(11);
    });
  });
});
