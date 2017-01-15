const fs = require('fs');
const path = require('path');
const utils = require('./utils');

const workoutDataFile = path.join(__dirname, 'workoutData.txt');

const vlcDir = 'D:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe';
const workoutDir = 'D:\\Google Drive\\Workout\\Insanity MAX 30\\Month 2\\';

const workouts = [
  '01. Max Out Cardio.mkv',
  '02. Max Out Power.mkv',
  '03. Max Out Sweat.mkv',
  '04. Max Out Strength.mkv',
  '05. Friday Fight Round 2.mkv',
];

function writeNextWorkoutIndex(workoutIndex) {
  return new Promise((resolve, reject) => {
    let nextWorkoutIndex = parseInt(workoutIndex, 10) + 1;
    nextWorkoutIndex = nextWorkoutIndex >= workouts.length ? 0 : nextWorkoutIndex;
    fs.writeFile(workoutDataFile, nextWorkoutIndex, (err) => {
      if (err) {
        console.log(err);
        return reject();
      }

      console.log('The file was saved!');
      return resolve(nextWorkoutIndex);
    });
  });
}

function getWorkoutIndex() {
  return new Promise((resolve) => {
    if (!fs.existsSync(workoutDataFile)) {
      return resolve('0');
    }
    return fs.readFile(workoutDataFile, 'utf8', (err, data) => {
      if (err) {
        return resolve('0');
      }
      return resolve(data.trim());
    });
  });
}

function startWorkoutIndex(workoutIndex) {
  return new Promise((resolve) => {
    const cmd = `"${vlcDir}" "${workoutDir}${workouts[workoutIndex]}"`;
    utils.runCommand(cmd).then(() => resolve(workoutIndex));
  });
}

function startWorkout() {
  return [
    getWorkoutIndex,
    startWorkoutIndex,
    writeNextWorkoutIndex,
  ].reduce((p, fn) => p.then(fn), Promise.resolve(0));
}
module.exports = {
  startWorkout,
};
