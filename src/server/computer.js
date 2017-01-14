const path = require('path');
const utils = require('./utils');

const nircmd = path.join(__dirname, 'nircmd-x64', 'nircmd.exe');

function shutdownComputer() {
  console.log('Shutting down computer...');
  return utils.runCommand('shutdown -s');
}

function muteSound() {
  console.log('Muting sound...');
  return utils.runCommand(`"${nircmd}" mutesysvolume 1`);
}

function unmuteSound() {
  console.log('Unmuting sound...');
  return utils.runCommand(`"${nircmd}" mutesysvolume 0`);
}

module.exports = {
  shutdownComputer,
  muteSound,
  unmuteSound,
};
