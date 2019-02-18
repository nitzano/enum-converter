## Unreleased

## 1.1.1

### Fixes

* emitFileName (previously: emitHeader) and emitStats options
  now work independently.
* fixed convertString() to use mediator file with the correct suffix.

## 1.1.0

* Added Typescript/Javascript lib support
  * convert() - convert enums
  * modify() - modify existing files

## 1.0.0

* First stable version
* Added json parser
* Fixed automatic variable translation bugs
* Fixed typescript dumper strings

## 0.1.1

### Fixes

* Fixed json dumper + added tests
* Fixed emit-header and emit-stats Flags

### Other changes

* Integrated with Travis CI

## 0.1.0

* Initial release version
  * basic conversion from one file to another and to to the same file
  * supported formats
    * typescript
    * python
  * styling: enum names, keys, values
  * sorting: enums in files, values in enums
