'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    return new Promise((resolve) => {
      this.log('I am going to do a few things.')
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
  
  writing() {
    this._run('dd', ['if=/dev/zero', 'of=config.img', 'bs=1', 'count=0', 'seek=2M']);
    this._run('mkfs.vfat', ['-n', 'cidata', 'config.img']);
    this._run('mkdir', ['mnt']);
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
  
  end() {
    this.log('All done');
  }
};
