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

Styling

```
enumc enums.py --to typescript --sort
enumc enums.py --self --sort-enums=asc --key-style upper
enumc enums.py --self --sort-enums=asc --sort-values=value_desc
```

## Supported languages

* [x] Python
* [x] Typescript
* [x] Json
* [ ] Java
* [ ] C#
* [ ] C/C++

## Features

* Converting from one language to another
* Styling
  * Sorting - enums in files, values in enums
  * String styles - enum names, keys and values
* Future versions
  * converting from configuration file
  * directory conversion
  * watch mode
