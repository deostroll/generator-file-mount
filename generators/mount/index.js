'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    return new Promise((resolve) => {
      this.log('I am going to mount stuff. Hope you are running as root')
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
  _run(...args) {
    this.log(`#### command: ${args.join(' ')}`);
    this.log('');
    let res = this.spawnCommandSync(...args);
    if(res.status === null) {
      throw res.error;
    } if(res.status !== 0) {
      throw new Error(`The command ${args[0]} exited with status code: ${res.status}`);
    }
    this.log('----');
    this.log('');
  }

  writing() {
    this._run('mount', ['config.img', 'mnt']);
  }

  end() {
    this.log('All done');
  }
};
