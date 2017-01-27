var path = require('path');
var dust = require('dustjs-linkedin');

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  if (this.query.indexOf('preserveWhitespace') > -1) {
    dust.config.whitespace = true;
  }

  var name = this.resourcePath
    .replace(this.options.context + path.sep, '')
    .replace('.dust', '')
    .split(path.sep)
    .join('/');
  var compiled = dust.compile(content, name);

  return "module.exports = " + compiled;
};
