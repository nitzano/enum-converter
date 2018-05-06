[![npm](https://img.shields.io/npm/v/enum-converter.svg)](https://www.npmjs.com/package/enum-converter)
[![npm](https://img.shields.io/npm/dw/enum-converter.svg)](https://www.npmjs.com/package/enum-converter)
[![Build Status](https://travis-ci.org/nitzano/enum-converter.svg?branch=master)](https://travis-ci.org/nitzano/enum-converter)
![license](https://img.shields.io/github/license/nitzano/enum-converter.svg)

# Enum Converter (enumc)

Convert Enums from one language to another

- [Enum Converter (enumc)](#enum-converter-enumc)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Simple conversion](#simple-conversion)
    - [Styling](#styling)
  - [Supported languages](#supported-languages)
  - [Features](#features)

## Installation

```
npm install -g enum-converter
```

## Usage

### Simple conversion

```
enumc enums.py --to typescript
enumc enums.ts --to python --out my-enums.py
enumc enums.x --from python --to typescript
```

### Styling

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
