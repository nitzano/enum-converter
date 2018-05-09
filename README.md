[![npm](https://img.shields.io/npm/v/enum-converter.svg)](https://www.npmjs.com/package/enum-converter)
[![npm](https://img.shields.io/npm/dw/enum-converter.svg)](https://www.npmjs.com/package/enum-converter)
[![Build Status](https://travis-ci.org/nitzano/enum-converter.svg?branch=master)](https://travis-ci.org/nitzano/enum-converter)
[![license](https://img.shields.io/github/license/nitzano/enum-converter.svg)](https://github.com/nitzano/enum-converter/blob/master/LICENSE)

# Enum Converter (enumc)

Convert Enums from one language to another

- [Enum Converter (enumc)](#enum-converter-enumc)
  - [Installation](#installation)
  - [Usage](#usage)
    - [CLI](#cli)
    - [API](#api)
  - [Supported languages](#supported-languages)
  - [Features](#features)

## Installation

```
npm install -g enum-converter
```

## Usage

### CLI

```
// simple conversion
enumc enums.py --to typescript
enumc enums.ts --to python --out my-enums.py
enumc enums.x --from python --to json

// convert with styling
enumc enums.py --to typescript --sort-enums asc

// modify existing files
enumc enums.py --modify --key-style upper --name-style kebab
enumc enums.py --modify --sort-enums=desc --sort-values=value_desc
```

### API

```typescript
import {
  convert,
  convertFile,
  Language,
  StringStyle,
  EnumsOrder
} from 'enum-converter';

// simple conversion
convert('enums.py', Language.Typescript);

convert('enums.ts', Language.Python, {
  out: 'my-enums.py'
});

convert('enums.x', Language.Json, {
  from: Language.Python
});

// convert with styling
convert('enums.py', Language.Typescript, {
  sortEnums: EnumsOrder.Asc
});

// modify existing files
modify('enums.py' {
  sortEnums: EnumsOrder.Desc,
})

modify('enums.py' {
  sortEnums: StringStyle.Upper,
  sortValues: ValuesOrder.ValueDesc,
})
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
* Sort
  * enums in a file
  * keys and values in every enum
* Style enum names, keys and values
* Future versions
  * converting programmatically
  * More languages parsers/dumpers
  * converting from configuration file
  * directory conversion
  * watch mode
