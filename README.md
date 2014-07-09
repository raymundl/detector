Scan files to find whether certain text pattern exists.

# Installation

```bash
npm install -g pattern-detector
```

# Usage

```basg
Usage: detect [options]

  Options:

    -d, --directory [directory path]  root directory to search from, defaults to pwd
    -p, --pattern [text pattern]      text pattern to find
```

# Example 

Find whether `require()` is called in the current working direcotry:

```bash
detect --pattern 'require(.+)'
```

The output will be:

/Users/ltebean/Desktop/nodejs-workspace/tabs/README.md line 35: var tabs = require('tabs');



