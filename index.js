var path = require('path');
var dust = require('dustjs-linkedin');

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }


  var name = this.resourcePath.replace(this.options.context + path.sep, '').replace('.dust', '').replace(path.sep, '/'),
    compiled = dust.compile(content, name);

  return "module.exports = " + compiled;
};
