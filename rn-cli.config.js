// const blacklist = require('metro').createBlacklist;
//
// module.exports = {
//   getBlacklistRE: function() {
//     return blacklist([/#current-cloud-backend\/.*/]);
//   }
// };


const blacklist = require('metro-config/src/defaults/blacklist');

// blacklist is a function that takes an array of regexes and combines
// them with the default blacklist to return a single regex.

module.exports = {
  resolver: {
    blacklistRE: blacklist([/#current-cloud-backend\/.*/])
  }
};
