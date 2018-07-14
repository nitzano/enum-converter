# Contributing to Enum-Converter

Thanks for helping Enum Converter! Here's you'll find the basic guidelines for contributing new code.

## What we need ? 

We are always looking for help in the following :

1.  Supporting more languages
    1.  GO, C++ or any other language you want
        1.  Requirements
            1.  MIT or similar
            2.  Can be downloaded from NPM :)

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
