/**
 * @module geomExportObj
 */

/**
 * Parse a simplicial complex and return an obj string
 *
 * @see http://paulbourke.net/dataformats/obj/
 * @param {import("./types.js").SimplicialComplex} geometry
 * @param {import("./types.js").GeomExportObjOffsets} [offsets={ positions: 0, normals: 0, uvs: 0 }}]
 * @param {string} [defaultName] A name for the object if geometry.name is not specified.
 * @returns {string}
 */
function parse(
  { positions, normals, uvs, cells, name, materialName },
  offsets = { positions: 0, normals: 0, uvs: 0 },
  defaultName
) {
  // object name
  let output = `o ${name || defaultName}\n`;

  // material name
  if (materialName) output += `usemtl ${materialName}\n`;

  // geometric vertices
  if (positions) {
    for (let i = 0; i < positions.length; i += 3) {
      output += `v ${positions[i]} ${positions[i + 1]} ${positions[i + 2]}\n`;
    }
  }

  // texture vertices
  if (uvs) {
    for (let i = 0; i < uvs.length; i += 2) {
      output += `vt ${uvs[i]} ${uvs[i + 1]}\n`;
    }
  }

  // vertex normals
  if (normals) {
    for (let i = 0; i < normals.length; i += 3) {
      output += `vn ${normals[i]} ${normals[i + 1]} ${normals[i + 2]}\n`;
    }
  }

  // face
  // https://en.wikipedia.org/wiki/Wavefront_.obj_file#Face_elements
  if (cells) {
    for (let i = 0; i < cells.length; i += 3) {
      const face = [cells[i], cells[i + 1], cells[i + 2]].map((cellIndex) =>
        [
          `${cellIndex + 1 + offsets.positions}`,
          uvs ? `${cellIndex + 1 + offsets.uvs}` : normals ? null : false,
          normals ? `${cellIndex + 1 + offsets.normals}` : false,
        ]
          .filter((a) => a ?? true)
          .join("/")
      );
      output += `f ${face.join(" ")}\n`;
    }
  }

  return output;
}

/**
 * Parse one or more simplicial complex geometry and return an obj string and vertices offsets.
 *
 * @alias module:geomExportObj
 * @param {import("./types.js").SimplicialComplex|import("./types.js").SimplicialComplex[]} geometries
 * @param {import("./types.js").GeomExportObjOptions} [options={}]
 * @returns {import("./types.js").GeomExportObjReturnValue}
 */
function geomExportObj(geometries, options = {}) {
  const {
    header = `# geom-export-obj\n`,
    prefix = `Mesh_`,
    offsets = { positions: 0, normals: 0, uvs: 0 },
  } = options;

  return (Array.isArray(geometries) ? geometries : [geometries]).reduce(
    (current, geometry, index) => {
      current.output += parse(geometry, current.offsets, `${prefix}${index}`);

      if (geometry.positions) {
        current.offsets.positions += geometry.positions.length / 3;
      }
      if (geometry.normals) {
        current.offsets.normals += geometry.normals.length / 3;
      }
      if (geometry.uvs) {
        current.offsets.uvs += geometry.uvs.length / 2;
      }

      return current;
    },
    { output: header, offsets }
  );
}

export { parse };

export default geomExportObj;
