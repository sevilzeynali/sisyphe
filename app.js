#!/usr/bin/env node

'use strict';

const program = require('commander'),
  Sisyphe = require('./src/sisyphe'),
  bluebird = require('bluebird'),
  fs = bluebird.promisifyAll(require('fs'));

program
  .version('0.0.1')
  .usage('<path>')
  .parse(process.argv);

const pathInput = program.args[0];
fs.statAsync(pathInput)
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .then(() => {
    const sisyphe = new Sisyphe({
      module: "walker-fs",
      options: {
        path: pathInput
      }
    });

    sisyphe
      .initialize()
      .then(() => sisyphe.start());
  });


