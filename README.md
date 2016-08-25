Scan files to find whether certain text pattern exists.

# Installation

```bash
npm install -g pattern-detector
```

# Usage

```basg
Usage: detect [options]

Options:

  -h, --help                           output usage information
  -V, --version                        output the version number
  -d, --directory [directory path]     root directory to search from, defaults to pwd
  -p, --pattern [text pattern]         text pattern to find
  -e, --exclusion [exclusion pattern]  exclusive directory or file pattern
  -i, --inclusion [inclusion pattern]  inclusive file pattern after exclusion
  -v, --verbose                        verbose output
  -x, --execute [cmd]                  execute "cmd [file name]" if text pattern matched
```

# Example 

Find whether `require()` is called in the current working direcotry, ignoring certain files:

```bash
detect -p 'require(.+)' -e 'node_modules|.git|README'
detect -p tedious -e "(node_modules|\.zip)$" -i "\.json$" -v -x open
```

The output will be:

```
./bin/detector.js line 3
./bin/detector.js line 4
./bin/detector.js line 5
```


