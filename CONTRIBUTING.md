# Contributing to Enum-Converter

## Recommended knowledge

* Node.js
* Typescript
* Working with Dockers
* Jest

## Development Setup

You can work on docker (recommended) or on your own setup.

### Docker Setup

1.  Install Docker Toolbox / Docker
2.  Inside docker cli

    1.  `docker-compose up` - builds the image for live mode
    2.  commands

        1.  `test` : run jest tests
        2.  `test:watch` : run tests in continues mode
            (not auto updates at the moment because of jest watcher)
        3.  `cli` - run cli commands
        4.  `debug` - attach debug to cli commands

### VSCode Docker Debugger Setup

#### launch.json

```
{
      "type": "node",
      "request": "attach",
      "name": "Attach to Docker",
      "address": "DOCKER_MACHINE_IP",
      "port": 9229,
      "restart": true,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/work",
      "outFiles": ["${workspaceFolder}/lib/*/.js"]
}
```
