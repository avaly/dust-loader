var dust = require('dustjs-linkedin');

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  var name = this.resourcePath.replace(this.options.context + '/', '').replace('.dust', ''),
    compiled = dust.compile(content, name);

  return "module.exports = " + compiled;
};
