var fs = require('fs');
var Module = module.constructor;

function stripBOM(content) {
  // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
  // because the buffer-to-string conversion in `fs.readFileSync()`
  // translates it to FEFF, the UTF-16 BOM.
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

function useTranspiler(transpiler) {
	Module._extensions['.js'] = function(module, filename) {
		var content = fs.readFileSync(filename, 'utf8');
		content = transpiler(content, filename);
	  module._compile(stripBOM(content), filename);
	};
}

module.exports = useTranspiler;