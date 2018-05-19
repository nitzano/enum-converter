## Open Issues

* [ ] Next Version - Patch version (1.1.1)
  * [x] Make emitHeader (change to emitFileName) and emitStats work independently
  * [ ] Change api to be
    * [x] remove 'file', 'modify', 'out' from config options
    * [x] create convertString(enumStr, config)
      * [x] make convert() point to convertString
    * [x] create convertFile(filePath, config)
    * [ ] Add more tests to cli and convert
  * [ ] Refactor parser to return EnumFile in parse instead of null and remove EnumFile from ctor
  * [ ] parse yargs as api and not external process
  * [ ] change emit-header and emit-stats to --no-header and --no-stats
* [ ] Use a better logging library
* [ ] Testing
  * [ ] add coverage tests
* [ ] Development environment
  * [ ] use NODE_PATH for full volume sync
