var test = require('tap').test;
var toColor = require('./');

test('toColor', function(t) {
    t.equal(toColor('a'), 'rgba(68,374,68,0.75)');
    t.equal(toColor('tom'), 'rgba(255,85,340,0.75)');
    t.equal(toColor('eden', 1), 'rgba(68,357,374,1)');
    t.equal(toColor('ede', 1), 'rgba(68,357,68,1)');
    t.equal(toColor('quakes', 1), 'rgba(68,204,153,1)');
    t.end();
});
