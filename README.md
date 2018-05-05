# Enum Converter (enumc)

Convert Enums from one language to another

- [Enum Converter (enumc)](#enum-converter-enumc)
  - [Quick start](#quick-start)
  - [Supported languages](#supported-languages)
  - [Features](#features)

## Quick start

Install the package

```
npm install -g enum-converter
```

Simple conversion

```
enumc enums.py --to typescript
enumc enums.ts --to python --out my-enums.py
enumc enums.x --from python --to typescript
```

With Styling

```
enumc enums.py --to typescript --sort-enums asc
enumc enums.py --self --key-style upper --name-style kebab
enumc enums.py --self --sort-enums=desc --sort-values=value_desc
```

## Supported languages

* [x] Python
* [x] Typescript
* [x] Json
* [ ] Java
* [ ] C#
* [ ] C/C++
* [ ] Go

## Features

* Convert from one file to another
* Modify existing files
* Sort enums in files, values in enums
* Style enum names, keys and values
* Future versions
  * More languages parsers/dumpers
  * converting from configuration file
  * directory conversion
  * watch mode
