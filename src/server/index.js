const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const workout = require('./workout');
const computer = require('./computer');
const utils = require('./utils');

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(bodyParser.json());

app.get('/pc', (req, res) => res.send('Hello!'));

app.post('/pc/start-workout', utils.authenticate(), (req, res) =>
  workout.startWorkout().then(() => res.send('Workout Started!')));

app.post('/pc/stop-workout', utils.authenticate(), (req, res) =>
  workout.stopWorkout().then(() => res.send('Workout Stopped!')));

app.post('/pc/mute-sound', utils.authenticate(), (req, res) =>
  computer.muteSound().then(() => res.send('Sound Muted!')));

app.post('/pc/unmute-sound', utils.authenticate(), (req, res) =>
  computer.unmuteSound().then(() => res.send('Sound Unuted!')));

app.post('/pc/shutdown-computer', utils.authenticate(), (req, res) =>
  computer.shutdownComputer().then(() => res.send('Computer Shutdown!')));

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true,
}));

console.log(`Simple Express server listening on port ${port}`);
app.listen(port);
