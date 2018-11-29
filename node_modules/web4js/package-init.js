/* jshint ignore:start */


// Browser environment
if(typeof window !== 'undefined') {
    web4 = (typeof window.web4 !== 'undefined') ? window.web4 : require('web4');
    BigNumber = (typeof window.BigNumber !== 'undefined') ? window.BigNumber : require('bignumber.js');
}


// Node environment
if(typeof global !== 'undefined') {
    web4 = (typeof global.web4 !== 'undefined') ? global.web4 : require('web4');
    BigNumber = (typeof global.BigNumber !== 'undefined') ? global.BigNumber : require('bignumber.js');
}

/* jshint ignore:end */