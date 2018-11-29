var web4 = require('./lib/web4');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.web4 === 'undefined') {
    window.web4 = web4;
}

module.exports = web4;
