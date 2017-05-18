var dust = require('dustjs-linkedin');
var tpl = require('./rootDirTemplate.dust');

dust.render(tpl, {
  name: 'World'
}, function(err, result){
  // `t` is from the test environment
  t.context.result = result; // eslint-disable-line no-undef
});
