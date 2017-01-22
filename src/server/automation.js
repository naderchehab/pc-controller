const robot = require('robotjs');

function type(str) {
  robot.typeString(str);
  return Promise.resolve(str);
}

function press(str) {
  const key = str.toLowerCase().trim();
  const keyMap = {
    enter: 'enter',
    delete: 'delete',
    backspace: 'backspace',
    tab: 'tab',
    escape: 'escape',
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
  };
  if (keyMap[key]) {
    robot.keyTap(keyMap[key]);
  }
  return Promise.resolve(key);
}

module.exports = {
  type,
  press,
};
