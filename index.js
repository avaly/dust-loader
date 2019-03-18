const path = require('path');
const dust = require('dustjs-linkedin');
const loaderUtils = require('loader-utils')

module.exports = function(content) {

  const options = loaderUtils.getOptions(this) || {};

  //If rootDir is configured then omit it from the template name
  const rootDir = options['rootDir'] ? `${path.normalize(options['rootDir'])}${path.sep}` : '';

  if (this.cacheable) {
    this.cacheable();
  }

  if (typeof options === "string" && options.indexOf('preserveWhitespace') > -1) {
    dust.config.whitespace = true;
  }

  if (options['preserveWhitespace']) {
    dust.config.whitespace = true;
  }

  const context = this.rootContext || this.options.context; 

  const name = this.resourcePath
    .replace(context + path.sep + rootDir, '')
    .replace('.dust', '')
    .split(path.sep)
    .join('/');

  const compiled = dust.compile(content, name);

  return "module.exports = " + compiled;
};
