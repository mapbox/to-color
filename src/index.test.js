import toColor from './index';

describe('toColor', () => {
  describe('throws', () => {
    it('invalid seed value passed', () => {
      try {
        new toColor([]);
      } catch (err) {
        expect(err).toEqual(
          new TypeError('Seed value must be a number or string')
        );
      }
    });
  });

  describe('basic', () => {
    const color = new toColor('tristen');

    it('returns deterministic color on getColor', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(47, 57%, 52%)',
          raw: [47, 57, 52]
        }
      });
    });

    it('returns a different determinisic value calling getColor again', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(315, 62%, 38%)',
          raw: [315, 62, 38]
        }
      });
    });
  });

  describe('number as value', () => {
    const color = new toColor(1234);
    it('works with a number', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(152, 35%, 29%)',
          raw: [152, 35, 29]
        }
      });
    });
  });

  describe('brightness/saturation', () => {
    const color = new toColor('penny', { brightness: 0.5, saturation: 0.5 });

    it('returns deterministic color on getColor', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(87, 14%, 31%)',
          raw: [87, 14, 31]
        }
      });
    });

    it('returns a different determinisic value calling getColor again', () => {
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(337, 32%, 24%)',
          raw: [337, 32, 24]
        }
      });
    });
  });

  describe('limit', () => {
    it('returns a blue color', () => {
      const color = new toColor('hi');
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(181, 58%, 44%)',
          raw: [181, 58, 44]
        }
      });
    });

    it('returns a different color as blue is limited', () => {
      const color = new toColor('hi', { limit: ['blue'] });
      expect(color.getColor()).toEqual({
        hsl: {
          formatted: 'hsl(285, 62%, 52%)',
          raw: [285, 62, 52]
        }
      });
    });
  });

  describe('getColor seeding', () => {
    it('returns the same color regardless of order', () => {
      const color = new toColor('genres');

      const a = color.getColor('jazz');
      const b = color.getColor('fusion');
      const c = color.getColor('jazz');

      expect(a.hsl.formatted).toEqual(c.hsl.formatted);
      expect(a.hsl.formatted).not.toEqual(b.hsl.formatted);
    });

    it('works with root seeding being different', () => {
      const colorA = new toColor('genres');
      const colorB = new toColor('dance');

      const aa = colorA.getColor('jazz');
      const ab = colorA.getColor('fusion');
      const ac = colorA.getColor('jazz');

      const ba = colorB.getColor('jazz');
      const bb = colorB.getColor('fusion');
      const bc = colorB.getColor('jazz');

      expect(aa.hsl.formatted).toEqual(ac.hsl.formatted);
      expect(aa.hsl.formatted).not.toEqual(ab.hsl.formatted);

      expect(aa.hsl.formatted).not.toEqual(ba.hsl.formatted);
      expect(ba.hsl.formatted).not.toEqual(bb.hsl.formatted);
      expect(ba.hsl.formatted).toEqual(bc.hsl.formatted);
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
          formatted: 'hsl(91, 84%, 33%)',
          raw: [91, 84, 33]
        }
      });
    });
  });
});
