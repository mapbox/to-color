var test = require('tap').test;
var toColor = require('./');

test('toColor', function(t) {
    t.equal(toColor('a'), 'rgba(68,170,68,0.75)');
    t.equal(toColor('tom'), 'rgba(187,153,68,0.75)');
    t.equal(toColor('eden', 1), 'rgba(68,221,170,1)');
    t.equal(toColor('ede', 1), 'rgba(68,221,204,1)');
    t.end();
});
