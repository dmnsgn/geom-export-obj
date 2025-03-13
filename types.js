/**
 * @typedef {object} SimplicialComplex Geometry definition. All optional.
 * @property {number[]} positions
 * @property {number[]} normals
 * @property {number[]} uvs
 * @property {number[]} cells
 * @property {string} name The object name.
 * @property {string} [materialName] The object material name.
 */

/**
 * @typedef {object} GeomExportObjOffsets Offsets to for cells. Useful if appending to another obj string. Used internally.
 * @property {number} positions
 * @property {number} normals
 * @property {number} uvs
 */

/**
 * @typedef {object} GeomExportObjOptions Options for exporter.
 * @property {string} [header=# geom-export-obj\n] Header to be prepended to the file.
 * @property {string} [prefix=Mesh_] Prefix for object names.
 * @property {GeomExportObjOffsets} [offsets={ positions: 0, normals: 0, uvs: 0 }] The initial offsets for cells.
 * @property {number} [precision] Decimal digit precision for positions/normals/uvs/vertexColors.
 */

/**
 * @typedef {object} GeomExportObjReturnValue
 * @property {string} output The obj as a string.
 * @property {GeomExportObjOffsets} offsets
 */

export {};
