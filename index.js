/** @module geomExportObj */

/**
 * Parse a simplicial complex and return an obj string
 *
 * @see http://paulbourke.net/dataformats/obj/
 * @see https://paulbourke.net/dataformats/obj/colour.html
 * @param {import("./types.js").SimplicialComplex} geometry
 * @param {import("./types.js").GeomExportObjOffsets} [offsets={ positions: 0, normals: 0, uvs: 0 }}]
 * @param {string} [defaultName] A name for the object if geometry.name is not specified.
 * @param {number} [precision] Decimal digit precision for positions/normals/uvs/vertexColors.
 * @returns {string}
 */
function parse(
  { positions, normals, uvs, cells, vertexColors, name, materialName },
  offsets = { positions: 0, normals: 0, uvs: 0 },
  defaultName,
  precision,
) {
  // object name
  let output = `o ${name || defaultName}\n`;

  // material name
  if (materialName) output += `usemtl ${materialName}\n`;

  // Helper for number precision
  let numberPrecisionScale;
  const getNumber = (n) => {
    if (!precision) return n;
    numberPrecisionScale ||= 10 ** precision;
    return Math.floor(n * numberPrecisionScale) / numberPrecisionScale;
  };

  // geometric vertices and optional vertex colors
  if (positions) {
    // Helper for vertex colors parsing and formating
    let vertexColorsSize;
    const getVertexColors = (positionIndex) => {
      if (!vertexColors) return "";
      vertexColorsSize ||=
        vertexColors?.length / 4 === positions.length / 3 ? 4 : 3;
      const i = (positionIndex / 3) * vertexColorsSize;
      return ` ${getNumber(vertexColors[i])} ${getNumber(vertexColors[i + 1])} ${getNumber(vertexColors[i + 2])}`;
    };

    for (let i = 0; i < positions.length; i += 3) {
      output += `v ${getNumber(positions[i])} ${getNumber(positions[i + 1])} ${getNumber(positions[i + 2])}${getVertexColors(i)}\n`;
    }
  }

  // texture vertices
  if (uvs) {
    for (let i = 0; i < uvs.length; i += 2) {
      output += `vt ${getNumber(uvs[i])} ${getNumber(uvs[i + 1])}\n`;
    }
  }

  // vertex normals
  if (normals) {
    for (let i = 0; i < normals.length; i += 3) {
      output += `vn ${getNumber(normals[i])} ${getNumber(normals[i + 1])} ${getNumber(normals[i + 2])}\n`;
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
          .join("/"),
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
    precision,
  } = options;

  return (Array.isArray(geometries) ? geometries : [geometries]).reduce(
    (current, geometry, index) => {
      current.output += parse(
        geometry,
        current.offsets,
        `${prefix}${index}`,
        precision,
      );

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
    { output: header, offsets },
  );
}

export { parse };

export default geomExportObj;

export * from "./types.js";
