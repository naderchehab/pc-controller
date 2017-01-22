const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const workout = require('./workout');
const computer = require('./computer');
const web = require('./web');
const automation = require('./automation');
const utils = require('./utils');

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(bodyParser.json());

app.get('/pc', (req, res) => res.send('Hello! PC Controller Ready.'));

app.post('/pc/start-workout', utils.authenticate(), (req, res) =>
  workout.startWorkout().then(() => res.send('Workout started!')));

app.post('/pc/close-vlc', utils.authenticate(), (req, res) =>
  computer.closeVlc().then(() => res.send('VLC closed!')));

app.post('/pc/mute-sound', utils.authenticate(), (req, res) =>
  computer.muteSound().then(() => res.send('Sound muted!')));

app.post('/pc/unmute-sound', utils.authenticate(), (req, res) =>
  computer.unmuteSound().then(() => res.send('Sound unmuted!')));

app.post('/pc/increase-volume', utils.authenticate(), (req, res) =>
  computer.increaseVolume().then(() => res.send('Volume increased!')));

app.post('/pc/decrease-volume', utils.authenticate(), (req, res) =>
  computer.decreaseVolume().then(() => res.send('Volume decreased!')));

app.post('/pc/set-volume/:volPercent', utils.authenticate(), (req, res) =>
  computer.setVolume(req.params.volPercent).then(() => res.send(`Volume set to ${req.params.volPercent}!`)));

app.post('/pc/lock-computer', utils.authenticate(), (req, res) =>
  computer.lockComputer().then(() => res.send('Computer locked!')));

app.post('/pc/hibernate-computer', utils.authenticate(), (req, res) =>
  computer.hibernateComputer().then(() => res.send('Computer hibernated!')));

app.post('/pc/shutdown-computer', utils.authenticate(), (req, res) =>
  computer.shutdownComputer().then(() => res.send('Computer shutdown!')));

app.post('/pc/web-search/:searchTerm', utils.authenticate(), (req, res) =>
  web.searchFor(req.params.searchTerm).then(() => res.send('Web search performed!')));

app.post('/pc/open-site/:searchTerm', utils.authenticate(), (req, res) =>
  web.openSite(req.params.searchTerm).then(() => res.send('Site opened!')));

app.post('/pc/open-gmail', utils.authenticate(), (req, res) =>
  web.openGmail().then(() => res.send('Gmail opened!')));

app.post('/pc/type/:text', utils.authenticate(), (req, res) =>
  automation.type(req.params.text).then(() => res.send(`Typed text: ${req.params.text}`)));

app.post('/pc/press/:key', utils.authenticate(), (req, res) =>
  automation.press(req.params.key).then(() => res.send(`Pressed key: ${req.params.key}`)));

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true,
}));

console.log(`Simple Express server listening on port ${port}`);
app.listen(port);
