import toColor from './index';

describe('toColor', () => {
  describe('throws', () => {
    it('invalid seed value passed', () => {
      try {
        new toColor([]);
      } catch (err) {
        expect(err).toEqual(new TypeError('Seed value must be a number or string'));
      }
    });
  });

  describe('basic', () => {
    const color = new toColor('tristen');

    it('returns deterministic color on getColor', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(68, 83.64%, 57.19%)',
          raw: [68, 83.64, 57.19]
        }
      });
    });

    it('returns a different determinisic value calling getColor again', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(179, 74.19%, 69%)',
          raw: [179, 74.19, 69]
        }
      });
    });
  });

  describe('number as value', () => {
    const color = new toColor(1234);
    it('works with a number', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(148, 62.77%, 67.76%)',
          raw: [148, 62.77, 67.76]
        }
      });
    });
  });

  describe('brightness/saturation', () => {
    const color = new toColor('penny', { brightness: -50, saturation: 50 });

    it('returns deterministic color on getColor', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(107, 96.07%, 24.48%)',
          raw: [107, 96.07, 24.48]
        }
      });
    });

    it('returns a different determinisic value calling getColor again', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(14, 100%, 19.5%)',
          raw: [14, 100, 19.5]
        }
      });
    });
  });

  describe('distribution drops as recursion of getColor increases', () => {
    const color = new toColor('tristen');

    it('calls getColor 1000 times', () => {
      let finalValue;
      for (let i = 0; i !== 1000; i++) {
        finalValue = color.getColor();
      }
      expect(finalValue).toEqual({
        hsl: {
          formatted: 'hsl(188, 77.1%, 73.79%)',
          raw: [188, 77.1, 73.79]
        }
      });
    });
  });
});
