var path = require('path');
var dust = require('dustjs-linkedin');

module.exports = function(content) {
  //If rootDir is configured then omit it from the template name
  const rootDir = this.query['rootDir'] ? `${path.normalize(this.query['rootDir'])}${path.sep}` : '';

  if (this.cacheable) {
    this.cacheable();
  }

  if (typeof this.query === "string" && this.query.indexOf('preserveWhitespace') > -1) {
    dust.config.whitespace = true;
  }

  if (this.query['preserveWhitespace']) {
    dust.config.whitespace = true;
  }

  var name = this.resourcePath
    .replace(this.options.context + path.sep + rootDir, '')
    .replace('.dust', '')
    .split(path.sep)
    .join('/');
  var compiled = dust.compile(content, name);

  return "module.exports = " + compiled;
};
