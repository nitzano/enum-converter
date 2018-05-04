# Enum Converter (enumc)

Converting Enums from one language to another

- [Enum Converter (enumc)](#enum-converter-enumc)
  - [Usage](#usage)
  - [Supported language](#supported-language)
  - [Features](#features)
  - [Next version](#next-version)
  - [Tasks list](#tasks-list)

## Usage

```
npm install -g enum-converter

// basic
enumc enums.py --to typescript
enumc enums.ts --to python --out my-enums.py
enumc enums.x --from python --to typescript

// apply styling
enumc enums.py --to typescript --sort
enumc enums.py --self --sort-enums=asc --key-style upper
enumc enums.py --self --sort-enums=asc --sort-values=value_desc
```

## Supported language

* [x] Python
* [x] Typescript
* [x] Json
* [ ] Java
* [ ] C#
* [ ] C/C++

## Features

* Converting from one language to another
* Styling options
  * Sorting enums in files and values in enums
  * Styling enum names, keys and values
* converting from configuration file (future version)
* convert directories (future version)
* watch mode (future version)

## Next version

TBD

## Tasks list

* [ ] Make --out work
* [ ] Fix emitHeader, emitStats params
* [ ] Use a better logging library
* [ ] Production
  * [ ] allow to require library as typescript
  * [ ] add travis CI
  * [ ] Publish 0.0.1 to npm :)
* [ ] Testing
  * [ ] write tests for cli
  * [ ] add coverage tests
* [ ] Development environment
  * [ ] use NODE_PATH for full volume sync
  * [ ] fix the debugger
