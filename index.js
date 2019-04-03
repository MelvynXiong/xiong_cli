const spawn = require('cross-spawn');
const process = require('process')

const child = spawn('npm', ['list', '-g', '-depth', '0'], { stdio: 'inherit' });