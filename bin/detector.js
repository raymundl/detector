#!/usr/bin/env node
require('colors');
var program = require('commander');
var walker = require('walker');
var eachline = require('eachline');
var exec = require('child_process').exec;

program
  .version('0.0.1')
  .option('-d, --directory [directory path]', 'root directory to search from, defaults to pwd')
  .option('-p, --pattern [text pattern]', 'text pattern to find')
  .option('-e, --exclusion [exclusion pattern]', 'exclusive directory or file pattern')
  .option('-i, --inclusion [inclusion pattern]', 'inclusive file pattern after exclusion')
  .option('-k, --kind [string after last . in file name]', 'only files of specified kind is checked')
  .option('-v, --verbose', 'verbose output')
  .option('-x, --execute [cmd]', 'execute "cmd [file name]" if text pattern matched')
  .parse(process.argv);

if (!program.pattern) {
  console.log('\nYou must provide a text pattern. Use -h flag for help.\n');
  return;
}

var directory = program.directory || process.cwd();
var pattern = new RegExp(program.pattern);
var inclusion = program.inclusion ? new RegExp(program.inclusion) : null;
var exclusion = program.exclusion ? new RegExp(program.exclusion) : null;
var kind = program.kind ? new RegExp('\.'+program.kind+'$') : null;
var progress = {walker: 0, tester: 0};
var results = {};

walker(directory)
  .filterDir(function(dir, stat) {
    if (exclusion && exclusion.test(dir)) {
      return false;
    }
    return true;
  })
  .on('file', function(file, stat) {
    if (exclusion && exclusion.test(file)) {
      return;
    }
    if ((inclusion && inclusion.test(file)) || (!inclusion)) {
      if ((kind && kind.test(file)) || (!kind)) {
        progress.walker++;
        testFile(file);
      }
    }
  })
  .on('error', function(er, entry, stat) {
    console.log('Got error ' + er + ' on entry ' + entry)
  })
  .on('end', function() {
    //console.log('All files traversed.')
  })

function testFile(file) {
  var result = results[file] = [];
  var lineNum = 1;
  eachline.in(file, function(line) {
    if (pattern.test(line)) {
      if (program.verbose) {
        result.push('\n'+lineNum+': '+line.trim());
      } else {
        result.push(lineNum);
      }
    }
    lineNum++;
  }).on('finish', function() {
    if (result.length) {
      console.log(file.replace(directory,'.').blue, result.join(','));
      if (program.execute) exec(program.execute+" "+file);
    }
    progress.tester++;
    if (progress.walker === progress.tester) console.log('--- all files checked ---'.green);
  })
}
