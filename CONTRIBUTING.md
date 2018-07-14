# Contributing to Enum-Converter

Thanks for helping Enum Converter! Here's you'll find the basic guidelines for contributing new code.

## What we need ? 

We are always looking for help in the following :

### Supporting more languages

* Add support to more programming languages: GO, C++, ...
* Requirements
    * License: MIT or similar
    * Can be downloaded from NPM :)

### Other Issues

Can be found here : [Issues](https://github.com/nitzano/enum-converter/issues)

## Developer Certificate of Origin (DCO)

Please sign off your Git commits (```git commit -s```) to indicate that you agree to the terms of [Developer Certificate of Origin](https://developercertificate.org/).


## Development Environment

### Recommended knowledge

* Node.js
* Typescript
* Docker
* Jest

### Docker Setup

1.  Install Docker Toolbox / Docker
2.  Inside docker cli

    1.  `docker-compose up` - builds the image for live mode
    2.  `docker exec -it enumc bash` - attach to docker shell
    3.  commands
        1.  `cli` - run cli commands
        2.  `debug` - attach debugger to cli commands
        3.  `test` : run jest tests
        4.  `test:watch` : run tests in continues mode
            (not auto updates at the moment because of jest watcher)

#### VSCode Docker Debugger Setup

**launch.json**
```
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Docker",
      "address": "DOCKER_DAEMON_IP",
      "port": 9229,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/work"
    },
```

(Note : you might need to add `"outFiles": ["${workspaceFolder}/lib/**/*.js"]` )
