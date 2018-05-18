## Open Issues

* [ ] Next Version - Patch version (1.1.1)
  * [ ] Make emitHeader (change to emitFileName) and emitStats work independently
  * [ ] Change api to be
    * [ ] remove 'file' from config options
    * [ ] create convertString(enumStr, config)
      * [ ] make convert() point to convertString
    * [ ] create convertFile(filePath, config)
    * [ ] create convertLanguage (filePath, language, config)
  * [ ] Refactor parser to return EnumFile in parse instead of null and remove EnumFile from ctor
  * [ ] parse yargs as api and not external process
  * [ ] change emit-header and emit-stats to --no-header and --no-stats
* [ ] Use a better logging library
* [ ] Testing
  * [ ] add coverage tests
* [ ] Development environment
  * [ ] use NODE_PATH for full volume sync
