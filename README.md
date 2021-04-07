# geom-export-obj

[![npm version](https://img.shields.io/npm/v/geom-export-obj)](https://www.npmjs.com/package/geom-export-obj)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/geom-export-obj)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/geom-export-obj)](https://www.npmjs.com/package/geom-export-obj)
[![dependencies](https://img.shields.io/david/dmnsgn/geom-export-obj)](https://github.com/dmnsgn/geom-export-obj/blob/main/package.json)
[![types](https://img.shields.io/npm/types/geom-export-obj)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/geom-export-obj)](https://github.com/dmnsgn/geom-export-obj/blob/main/LICENSE.md)

Convert one (or more) simplicial complex geometry (positions/cells/normals/uvs) into an OBJ string.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/geom-export-obj/main/screenshot.png)

## Installation

```bash
npm install geom-export-obj
```

## Usage

```js
import geomExportObj from "geom-export-obj";
import { cube } from "primitive-geometry";
console.log(geomExportObj(cube()).output);
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_geomExportObj">geomExportObj</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SimplicialComplex">SimplicialComplex</a> : <code>Object</code></dt>
<dd><p>Geometry definition. All optional.</p>
</dd>
<dt><a href="#GeomExportObjOffsets">GeomExportObjOffsets</a> : <code>Object</code></dt>
<dd><p>Offsets to for cells. Useful if appending to another obj string. Used internally.</p>
</dd>
<dt><a href="#GeomExportObjOptions">GeomExportObjOptions</a> : <code>Object</code></dt>
<dd><p>Options for exporter.</p>
</dd>
<dt><a href="#GeomExportObjReturnValue">GeomExportObjReturnValue</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_geomExportObj"></a>

## geomExportObj

- [geomExportObj](#module_geomExportObj)
  - [geomExportObj(geometries, [options])](#exp_module_geomExportObj--geomExportObj) ⇒ [<code>GeomExportObjReturnValue</code>](#GeomExportObjReturnValue) ⏏
    - [~parse(geometry, [offsets], [defaultName])](#module_geomExportObj--geomExportObj..parse) ⇒ <code>string</code>

<a name="exp_module_geomExportObj--geomExportObj"></a>

### geomExportObj(geometries, [options]) ⇒ [<code>GeomExportObjReturnValue</code>](#GeomExportObjReturnValue) ⏏

Parse one or more simplicial complex geometry and return an obj string and vertices offsets.

**Kind**: Exported function

| Param      | Type                                                                                                                       | Default         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- | --------------- |
| geometries | [<code>SimplicialComplex</code>](#SimplicialComplex) \| [<code>Array.&lt;SimplicialComplex&gt;</code>](#SimplicialComplex) |                 |
| [options]  | [<code>GeomExportObjOptions</code>](#GeomExportObjOptions)                                                                 | <code>{}</code> |

<a name="module_geomExportObj--geomExportObj..parse"></a>

#### geomExportObj~parse(geometry, [offsets], [defaultName]) ⇒ <code>string</code>

Parse a simplicial complex and return an obj string

**Kind**: inner method of [<code>geomExportObj</code>](#exp_module_geomExportObj--geomExportObj)  
**See**: http://paulbourke.net/dataformats/obj/

| Param         | Type                                                       | Default                                            | Description                                              |
| ------------- | ---------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| geometry      | [<code>SimplicialComplex</code>](#SimplicialComplex)       |                                                    |                                                          |
| [offsets]     | [<code>GeomExportObjOffsets</code>](#GeomExportObjOffsets) | <code>{ positions: 0, normals: 0, uvs: 0 }}</code> |                                                          |
| [defaultName] | <code>string</code>                                        |                                                    | A name for the object if geometry.name is not specified. |

<a name="SimplicialComplex"></a>

## SimplicialComplex : <code>Object</code>

Geometry definition. All optional.

**Kind**: global typedef  
**Properties**

| Name           | Type                              | Description               |
| -------------- | --------------------------------- | ------------------------- |
| positions      | <code>Array.&lt;number&gt;</code> |                           |
| normals        | <code>Array.&lt;number&gt;</code> |                           |
| uvs            | <code>Array.&lt;number&gt;</code> |                           |
| cells          | <code>Array.&lt;number&gt;</code> |                           |
| name           | <code>string</code>               | The object name.          |
| [materialName] | <code>string</code>               | The object material name. |

<a name="GeomExportObjOffsets"></a>

## GeomExportObjOffsets : <code>Object</code>

Offsets to for cells. Useful if appending to another obj string. Used internally.

**Kind**: global typedef  
**Properties**

| Name      | Type                |
| --------- | ------------------- |
| positions | <code>number</code> |
| normals   | <code>number</code> |
| uvs       | <code>number</code> |

<a name="GeomExportObjOptions"></a>

## GeomExportObjOptions : <code>Object</code>

Options for exporter.

**Kind**: global typedef  
**Properties**

| Name      | Type                                                       | Default                                           | Description                         |
| --------- | ---------------------------------------------------------- | ------------------------------------------------- | ----------------------------------- |
| [header]  | <code>string</code>                                        | <code>&quot;# geom-export-obj\\n&quot;</code>     | Header to be prepended to the file. |
| [prefix]  | <code>string</code>                                        | <code>&quot;Mesh\_&quot;</code>                   | Prefix for object names.            |
| [offsets] | [<code>GeomExportObjOffsets</code>](#GeomExportObjOffsets) | <code>{ positions: 0, normals: 0, uvs: 0 }</code> | The initial offsets for cells.      |

<a name="GeomExportObjReturnValue"></a>

## GeomExportObjReturnValue : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name    | Type                                                       | Description          |
| ------- | ---------------------------------------------------------- | -------------------- |
| output  | <code>string</code>                                        | The obj as a string. |
| offsets | [<code>GeomExportObjOffsets</code>](#GeomExportObjOffsets) |                      |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/geom-export-obj/blob/main/LICENSE.md).
