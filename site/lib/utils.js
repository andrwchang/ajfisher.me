const moment = require('moment');

exports.kebabCase = (str) => {
  // this takes a spaced bit of text and effectively kebab cases it
  return (str.replace(' ', '-').toLowerCase());
};

exports.pathDate = (date) => {
  // takes a date in proper ISO format and then spits it out for path
  return moment(date).format('YYYY/MM/DD');
};
