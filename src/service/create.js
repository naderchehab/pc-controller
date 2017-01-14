const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'PC Controller',
  description: 'Node server to control the PC.',
  script: 'C:\\Users\\Nader\\Desktop\\Projects\\pc-controller\\src\\server\\index.js',
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', () => {
  svc.start();
});

svc.install();
