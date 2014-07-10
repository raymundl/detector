Scan files to find whether certain text pattern exists.

# Installation

```bash
npm install -g pattern-detector
```

# Usage

```basg

Options:

  -d, --directory [directory path]     root directory to search from, defaults to pwd
  -p, --pattern [text pattern]         text pattern to find
  -e, --exclusion [exclusion pattern]  exclusive file pattern
  -v, --verbose  
                        verbose output
```

# Example 

Find whether `require()` is called in the current working direcotry, ignoreing certain files

```bash
detect -p 'require(.+)' -e 'node_modules|.git'
```

The output will be:

./README.md line 24
./README.md line 27
./README.md line 32
./bin/detector.js line 3
./bin/detector.js line 4
./bin/detector.js line 5


