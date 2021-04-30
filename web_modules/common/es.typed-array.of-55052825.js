import { aj as typedArrayConstructorsRequireWrappers, a1 as arrayBufferViewCore } from './es.typed-array.float32-array-5404dd41.js';

var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = arrayBufferViewCore.exportTypedArrayStaticMethod;

// `%TypedArray%.of` method
// https://tc39.es/ecma262/#sec-%typedarray%.of
exportTypedArrayStaticMethod('of', function of(/* ...items */) {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);
  while (length > index) result[index] = arguments[index++];
  return result;
}, typedArrayConstructorsRequireWrappers);
