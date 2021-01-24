const toColor = require('./');

describe('toColor', () => {
  it('single value', () => {
    const actual = toColor('penny');
    const expected = {
      hsl: {
        formatted: 'hsl(107, 75.43%, 38.19%)',
        raw: [107, 75.43, 38.19]
      }
    };

    expect(actual).toEqual(expected);
  });

  it('single value with options', () => {
    const actual = toColor('penny', { brightness: -50, saturation: 50 });
    const expected = {
      hsl: {
        formatted: 'hsl(107, 92.3%, 23.4%)',
        raw: [107, 92.3, 23.4]
      }
    };

    expect(actual).toEqual(expected);
  });

  it('multiple values', () => {
    const actual = toColor(['penny', 'steve', 'cyrus', 'deli', 'mouse']);
    const expected = [
      {
        hsl: {
          formatted: 'hsl(210, 80.18%, 23.31%)',
          raw: [ 210, 80.18, 23.31 ]
        }
      },
      {
        hsl:{
          formatted: 'hsl(135, 66.94%, 69.75%)',
          raw: [ 135, 66.94, 69.75 ]
        }
      },
      {
        hsl:{
          formatted: 'hsl(274, 52.38%, 57.99%)',
          raw: [ 274, 52.38, 57.99 ]
        }
      },
      {
        hsl:{
          formatted: 'hsl(64, 70.94%, 47.97%)',
          raw: [ 64, 70.94, 47.97 ]
        }
      },
      {
        hsl:{
          formatted: 'hsl(178, 60%, 44.37%)',
          raw: [ 178, 60, 44.37 ]
        }
      }
    ]

    expect(actual).toEqual(expected);
  });

  it('multiple values with options', () => {
    const actual = toColor(['cyrus', 'deli', 'mouse'], { brightness: 20, saturation: -20 });
    const expected = [
      {
        hsl:{
          formatted: 'hsl(44, 100%, 77%)',
          raw: [ 44, 100, 77 ]
        }
      },
      {
        hsl:{
          formatted: 'hsl(227, 72.44%, 60.07%)',
          raw: [ 227, 72.44, 60.07 ]
        }
      },
      {
        hsl:{
          formatted: 'hsl(56, 99.99%, 70%)',
          raw: [ 56, 99.99, 70 ]
        }
      }
    ]

    expect(actual).toEqual(expected);
  });
});
