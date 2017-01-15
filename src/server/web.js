const utils = require('./utils');

const chromeExe = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const googleUrl = 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=';

function searchFor(searchTerm) {
  const cmd = `"${chromeExe}" "${googleUrl}${encodeURIComponent(searchTerm)}"`;
  return utils.runCommand(cmd);
}

module.exports = {
  searchFor,
};
