import toColor from './index';

describe('toColor', () => {
  describe('basic', () => {
    const color = new toColor('penny');

    test('returns deterministic color on getColor', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(107, 92.16%, 74.48%)',
          raw: [107, 92.16, 74.48]
        }
      });
    });

    it('returns a different determinisic value calling getColor again', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(14, 70.11%, 63.19%)',
          raw: [14, 70.11, 63.19]
        }
      });
    });
  });

  describe('options', () => {
    const color = new toColor('penny', { brightness: -50, saturation: 50 });

    test('returns deterministic color on getColor', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(107, 73.91%, 28.74%)',
          raw: [107, 73.91, 28.74]
        }
      });
    });

    it('returns a different determinisic value calling getColor again', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(14, 72.41%, 31.32%)',
          raw: [14, 72.41, 31.32]
        }
      });
    });
  });

});
