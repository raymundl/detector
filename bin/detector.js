#!/usr/bin/env node

var program = require('commander');
var walker = require('walker');
var lineReader = require('line-reader');


program
  .version('0.0.1')
  .option('-d, --directory [directory path]', 'root directory to search from, defaults to pwd')
  .option('-p, --pattern [text pattern]', 'text pattern to find')
  .option('-v, --verbose', 'verbose output')
  .parse(process.argv);

if (!program.pattern) {
  console.log('you must provide a text pattern');
  return;
}


var directory = program.directory || process.cwd();
var pattern = new RegExp(program.pattern);


walker(directory)
  .filterDir(function(dir, stat) {
    if (dir.indexOf('.git') != -1) {
      return false;
    }
    return true;
  }).on('file', function(file, stat) {
    testFile(file);
  })
  .on('error', function(er, entry, stat) {
    console.log('Got error ' + er + ' on entry ' + entry)
  })
  .on('end', function() {
    //console.log('All files traversed.')
  })

function testFile(file) {
  var lineNum = 1;
  lineReader.eachLine(file, function(line, last) {
    if (pattern.test(line)) {
      if(program.verbose){
        console.log('%s line %d: %s', file, lineNum, line.trim());
      }else{
        console.log('%s line %d', file.replace(directory,''), lineNum);
      }
    }
    lineNum++;
    return true;

  });
}