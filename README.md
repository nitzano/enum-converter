



<center>

# Enum Converter (enumc)

Convert Enums from one language to another

Live demo :  https://enum-converter.vercel.app

[![npm](https://img.shields.io/npm/v/enum-converter)](https://www.npmjs.com/package/enum-converter)
[![npm](https://img.shields.io/npm/v/enum-converter/next)](https://www.npmjs.com/package/enum-converter)

[![npm](https://img.shields.io/npm/dw/enum-converter.svg)](https://www.npmjs.com/package/enum-converter)
[![Build Status](https://travis-ci.org/nitzano/enum-converter.svg?branch=master)](https://travis-ci.org/nitzano/enum-converter)
[![license](https://img.shields.io/github/license/nitzano/enum-converter.svg)](https://github.com/nitzano/enum-converter/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

</center>



---

- [Enum Converter (enumc)](#enum-converter-enumc)
  - [Supported languages](#supported-languages)
  - [Installation](#installation)
  - [Usage](#usage)
    - [CLI](#cli)
    - [API](#api)
  - [Options](#options)
    - [Conversion](#conversion)
    - [Styling](#styling)


## Supported languages

* [x] Java
* [x] Json
* [x] Python
* [x] Typescript
* [ ] C/C++
* [ ] C#
* [ ] Go


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
  sortEnums: EnumsOrder.Ascending
});

// modify exiting files
modify('enums.py' {
  nameStyle: StringStyle.KebabCase,
  keyStyle: StringStyle.UpperCase,
})

modify('enums.py' {
  sortEnums: EnumsOrder.Ascending,
  sortValues: ValuesOrder.ValueDescending,
})
```


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
| key-style      | style enum key string                     | StringStyle |         |
| name-style     | style enum name string                    | StringStyle |         |
| value-style    | style enum value (strings only)           | StringStyle |         |



