<p align="center">
  <a href="http://runnerty.io">
    <img height="257" src="https://runnerty.io/assets/header/logo-stroked.png">
  </a>
  <p align="center">Smart Processes Management</p>
</p>

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]
<a href="#badge">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>

# Executor for [Runnerty]: JSON2CSV

### Installation:

Through NPM

```bash
npm i @runnerty/executor-json2csv
```

You can also add modules to your project with [runnerty-cli]

```bash
npx runnerty-cli add @runnerty/executor-json2csv
```

This command installs the module in your project, adds example configuration in your `config.json` and creates an example plan of use.

If you have installed [runnerty-cli] globally you can include the module with this command:

```bash
rty add @runnerty/executor-json2csv
```

### Configuration sample:

Add in [config.json]:

```json
{
  "id": "json2csv_default",
  "type": "@runnerty-executor-json2csv"
}
```

### Plan sample:

Add in [plan.json]:

#### JSON Example

```json
[
  {
    "planet": "Earth",
    "radius": 6371,
    "satellites": [
      {
        "name": "moon",
        "radius": 1737
      }
    ]
  },
  {
    "planet": "Mars",
    "radius": 3389,
    "satellites": [
      {
        "name": "phobos",
        "radius": 11267
      },
      {
        "name": "deimos",
        "radius": 6.2
      }
    ]
  }
]
```

#### Example 1:

```json
{
  "id": "json2csv_default",
  "inputPath": "./planets.json",
  "outputPath": "./planets.csv"
}
```

##### CSV Output

```
"planet","radius","satellites"
"Earth",6371,"[{""name"":""moon"",""radius"":1737}]"
"Mars",3389,"[{""name"":""phobos"",""radius"":11267},{""name"":""deimos"",""radius"":6.2}]"
```

#### Example 2:

```json
{
  "id": "json2csv_default",
  "inputPath": "./planets.json",
  "outputPath": "./planets.csv",
  "options": {
    "fields": ["planet", "radius", "satellites.name", "satellites.radius"]
  },
  "transforms": {
    "unwind": { "paths": ["satellites"] }
  }
}
```

##### CSV Ouput

```
"planet","radius","satellites.name","satellites.radius"
"Earth",6371,"moon",1737
"Mars",3389,"phobos",11267
"Mars",3389,"deimos",6.2
```

#### Full params example:

```json
{
  "id": "json2csv_default",
  "inputPath": "./input.json",
  "input": "@GV(MY_JSON)",
  "outputPath": "./output.csv",
  "options": {
    "fields": ["field1", "field2", "field3"],
    "defaultValue": "NULL",
    "header": true,
    "escapedQuote": "",
    "delimiter": ";",
    "eol": "\r\n",
    "excelStrings": true,
    "includeEmptyRows": true,
    "withBOM": true
  },
  "transforms": {
    "unwind": { "paths": ["items", "items.items"], "blankOut": true },
    "flatten": { "objects": true, "arrays": true, "separator": "_" }
  }
}
```

### Params

#### Options

| Option           | Description                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------- |
| fields           | List of fields to process. Defaults to field auto-detection.                              |
| defaultValue     | Default value to use for missing fields.                                                  |
| quote            | Character(s) to use as quote mark. Defaults to '"'.                                       |
| delimiter        | Character(s) to use as delimiter. Defaults to ','. (default: ",")                         |
| escapedQuote     | Character(s) to use as a escaped quote. Defaults to a double `quote`, '""'.               |
| eol              | Character(s) to use as End-of-Line for separating rows. Defaults to '\n'. (default: "\n") |
| excelStrings     | Wraps string data to force Excel to interpret it as string even if it contains a number.  |
| header           | Boolean to Enable/Disable the column name header. (Enabled by defaults)                   |
| includeEmptyRows | Boolean to Includes empty rows in the resulting CSV output.                               |
| withBOM          | Boolean to Includes BOM character at the beginning of the CSV.                            |

#### Transforms

| Option      | Description                                                                              |
| ----------- | ---------------------------------------------------------------------------------------- |
| unwind      | Creates multiple rows from a single JSON document similar to MongoDB unwind.             |
| - paths     | Unwind fields path.                                                                      |
| - blankOut  | When unwinding, blank out instead of repeating data. Defaults to false. (default: false) |
| flatten     | Nested javascript objects into a single level object.                                    |
| - object    | Flatten nested objects. Defaults to false. (default: false)                              |
| - arrays    | Flatten nested arrays. Defaults to false. (default: false)                               |
| - separator | Flattened keys separator. Defaults to '.'. (default: ".")                                |

### More information:

This executor is a wrapper of the module json2csv (zemirco), for more information consult the website of the [json2csv].

[runnerty]: http://www.runnerty.io
[downloads-image]: https://img.shields.io/npm/dm/@runnerty/executor-json2csv.svg
[npm-url]: https://www.npmjs.com/package/@runnerty/executor-json2csv
[npm-image]: https://img.shields.io/npm/v/@runnerty/executor-json2csv.svg
[david-badge]: https://david-dm.org/runnerty/executor-json2csv.svg
[david-badge-url]: https://david-dm.org/runnerty/executor-json2csv
[config.json]: http://docs.runnerty.io/config/
[plan.json]: http://docs.runnerty.io/plan/
[ejs]: https://ejs.co
[runnerty-cli]: https://www.npmjs.com/package/runnerty-cli
[json2csv]: https://github.com/zemirco/json2csv
