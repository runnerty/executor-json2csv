'use strict';
const { createReadStream, createWriteStream } = require('fs');
const strStream = require('string-to-stream');
const { unwind, flatten } = require('@json2csv/transforms');
const { AsyncParser } = require('@json2csv/node');

const Executor = require('@runnerty/module-core').Executor;

class json2csvExecutor extends Executor {
  constructor(process) {
    super(process);
    this.endOptions = { end: 'end' };
  }

  async exec(params) {
    const opts = params.options;
    const transforms = [];

    if (params.transforms) {
      // UNWIND
      if (params.transforms.unwind) transforms.push(unwind(params.transforms.unwind));

      //FLATTEN
      if (params.transforms.flatten) transforms.push(flatten(params.transforms.flatten));

      opts.transforms = transforms;
    }

    const outputPath = params.outputPath;

    let input;
    if (params.inputPath) {
      input = createReadStream(params.inputPath, { encoding: 'utf8' });
    } else {
      input = strStream(params.input);
    }

    const output = createWriteStream(outputPath, { encoding: 'utf8' });
    const asyncParser = new AsyncParser(opts);

    try {
      asyncParser.parse(input).pipe(output);
      this.end(this.endOptions);
    } catch (err) {
      this.endOptions.end = 'error';
      this.endOptions.messageLog = err;
      this.endOptions.err_output = err;
      this.end(this.endOptions);
    }
  }
}

module.exports = json2csvExecutor;
