const utils = require('./utils');

const chromeExe = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

function searchFor(searchTerm) {
  const googleUrl = 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=';
  const cmd = `"${chromeExe}" "${googleUrl}${encodeURIComponent(searchTerm)}"`;
  return utils.runCommand(cmd);
}

function openSite(searchTerm) {
  const duckDuckGoUrl = `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(searchTerm)}`;
  const cmd = `"${chromeExe}" "${duckDuckGoUrl}${encodeURIComponent(searchTerm)}"`;
  return utils.runCommand(cmd);
}

function openGmail() {
  const gmailUrl = 'https://mail.google.com';
  const cmd = `"${chromeExe}" "${gmailUrl}"`;
  return utils.runCommand(cmd);
}

module.exports = {
  searchFor,
  openSite,
  openGmail,
};
