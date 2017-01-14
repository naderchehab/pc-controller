const exec = require('child_process').exec;
const secret = require('./secret.json').secret;

function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log('error', error);
        reject();
      }
      if (stderr) {
        console.log('stderr', stderr);
      }
      if (stdout) {
        console.log('stdout', stdout);
      }
      resolve();
    });
  });
}

function authenticate() {
  return (req, res, next) => {
    if (req.body.secret !== secret) {
      console.log('Denied!');
      return res.send('Denied!');
    }
    return next();
  };
}

module.exports = {
  authenticate,
  runCommand,
};
