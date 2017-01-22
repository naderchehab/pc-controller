const path = require('path');
const utils = require('./utils');

const nircmd = path.join(__dirname, 'nircmd-x64', 'nircmd.exe');

function shutdownComputer() {
  console.log('Shutting down computer...');
  return utils.runCommand('shutdown -s');
}

function hibernateComputer() {
  console.log('Hibernating computer...');
  return utils.runCommand('shutdown -h');
}

function muteSound() {
  console.log('Muting sound...');
  return utils.runCommand(`"${nircmd}" mutesysvolume 1`);
}

function unmuteSound() {
  console.log('Unmuting sound...');
  return utils.runCommand(`"${nircmd}" mutesysvolume 0`);
}

function increaseVolume() {
  console.log('Increasing volume...');
  return utils.runCommand(`"${nircmd}" changesysvolume 10000`);
}

function decreaseVolume() {
  console.log('Decreasing volume...');
  return utils.runCommand(`"${nircmd}" changesysvolume -10000`);
}

function setVolume(volPercent) {
  console.log(`Setting volume to ${volPercent}%...`);
  const vol = (volPercent * 65535) / 100;
  return utils.runCommand(`"${nircmd}" setsysvolume ${vol}`);
}

function closeVlc(workoutIndex) {
  return new Promise((resolve) => {
    console.log('Closing VLC...');
    const cmd = 'TASKKILL /IM vlc.exe';
    utils.runCommand(cmd).then(() => resolve(workoutIndex));
  });
}

function lockComputer() {
  console.log('Locking computer...');
  const lockCommand = 'rundll32 user32.dll, LockWorkStation';
  return utils.runCommand(lockCommand);
}

function screenGrab() {
  console.log('Grabbing screen...');
  return utils.runCommand(`"${nircmd}" savescreenshot screen1.png`);
}

module.exports = {
  lockComputer,
  hibernateComputer,
  shutdownComputer,
  muteSound,
  unmuteSound,
  increaseVolume,
  decreaseVolume,
  setVolume,
  closeVlc,
  screenGrab,
};
