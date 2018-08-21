[![npm](https://img.shields.io/npm/v/enum-converter.svg)](https://www.npmjs.com/package/enum-converter)
[![npm](https://img.shields.io/npm/dw/enum-converter.svg)](https://www.npmjs.com/package/enum-converter)
[![Build Status](https://travis-ci.org/nitzano/enum-converter.svg?branch=master)](https://travis-ci.org/nitzano/enum-converter)
[![license](https://img.shields.io/github/license/nitzano/enum-converter.svg)](https://github.com/nitzano/enum-converter/blob/master/LICENSE)

# Enum Converter (enumc)

> Convert Enums from one language to another

Web Version :  https://enum-converter.herokuapp.com

---

- [Enum Converter (enumc)](#enum-converter-enumc)
  - [Installation](#installation)
  - [Usage](#usage)
    - [CLI](#cli)
    - [API](#api)
  - [Supported languages](#supported-languages)
  - [Features](#features)
  - [Options](#options)
    - [Conversion](#conversion)
    - [Styling](#styling)
  - [Example](#example)


## Installation

```
npm install -g enum-converter
```

## Usage

### CLI

> ``` enumc <file> [options] ```

```
// convert files
enumc enums.py --to typescript
enumc enums.ts --to python --out my-enums.py
enumc enums.x --from python --to json
enumc enums.py --to typescript --sort-enums asc

// modify existing files
enumc enums.py --modify --name-style kebab --key-style upper 
enumc enums.py --modify --sort-enums=asc --sort-values=value_desc
```

### API

```typescript
import {
  convert,
  EnumsOrder,
  Language,
  modify,
  StringStyle,
  ValuesOrder,
} from 'enum-converter';

// convert files
convert('enums.py', Language.Typescript);

convert('enums.ts', Language.Python, {
  out: 'my-enums.py'
});

convert('enums.x', Language.Json, {
  from: Language.Python
});

convert('enums.py', Language.Typescript, {
  sortEnums: EnumsOrder.Asc
});

// modify exiting files
modify('enums.py' {
  nameStyle: StringStyle.KebabCase,
  keyStyle: StringStyle.UpperCase,
})

modify('enums.py' {
  sortEnums: EnumsOrder.Asc,
  sortValues: ValuesOrder.ValueDesc,
})
```

## Supported languages

* [x] Java
* [x] Json
* [x] Python
* [x] Typescript
* [ ] C/C++
* [ ] C#
* [ ] Go

## Features

* Converting enum files/strings
* Modify existing files
* Sort
  * enums in a file
  * keys and values in every enum
* Style enum names, keys and values
* Convert by Api or Cli
* Future versions  
  * More languages parsers/dumpers
  * converting from configuration file
  * directory conversion
  * watch mode

## Options

### Conversion

| Name   | Meaning                    | type     | default |
| ------ | -------------------------- | -------- | ------- |
| from   | source language (explicit) | Language |         |
| to     | destination language       | Language |         |
| out    | destination file           | string   |         |
| modify | modify existing file       | boolean  | false   |


### Styling

| Name           | Meaning                                   | type        | default |
| -------------- | ----------------------------------------- | ----------- | ------- |
| emit-file-name | emit source file name to destination file | boolean     | true    |
| emit-stats     | emit stats to destination file            | boolean     | true    |
| sort-enums     | sort enums in files                       | EnumsOrder  |         |
| sort-values    | sort values in enums                      | ValuesOrder |         |
| key-style      | enum key string style                     | StringStyle |         |
| name-style     | enum name string style                    | StringStyle |         |
| value-style    | enum value string style (strings only)    | StringStyle |         |

## Example

```bash
cat enum.ts
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}
```

```
enumc enum.ts --to python
# From enum.ts (1 Enums 4 Values)

from enum import Enum, auto

class Direction(Enum):
    Up = 1
    Down = auto()
    Left = auto()
    Right = auto()
```
