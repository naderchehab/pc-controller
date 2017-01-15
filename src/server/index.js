const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const workout = require('./workout');
const computer = require('./computer');
const web = require('./web');
const utils = require('./utils');

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(bodyParser.json());

app.get('/pc', (req, res) => res.send('Hello!'));

app.post('/pc/start-workout', utils.authenticate(), (req, res) =>
  workout.startWorkout().then(() => res.send('Workout started!')));

app.post('/pc/close-vlc', utils.authenticate(), (req, res) =>
  computer.closeVlc().then(() => res.send('VLC closed!')));

app.post('/pc/mute-sound', utils.authenticate(), (req, res) =>
  computer.muteSound().then(() => res.send('Sound muted!')));

app.post('/pc/unmute-sound', utils.authenticate(), (req, res) =>
  computer.unmuteSound().then(() => res.send('Sound unmuted!')));

app.post('/pc/shutdown-computer', utils.authenticate(), (req, res) =>
  computer.shutdownComputer().then(() => res.send('Computer shutdown!')));

app.post('/pc/web-search/:searchTerm', utils.authenticate(), (req, res) =>
  web.searchFor(req.params.searchTerm).then(() => res.send('Web search performed!')));


app.use(errorHandler({
  dumpExceptions: true,
  showStack: true,
}));

console.log(`Simple Express server listening on port ${port}`);
app.listen(port);
