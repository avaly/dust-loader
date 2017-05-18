import path from 'path';
import test from 'ava';
import MemoryFS from 'memory-fs';
import webpack from 'webpack';

const FIXTURES = path.resolve(__dirname, '_fixtures_');

const WEBPACK_CONFIG = {
  entry: [
    'dustjs-linkedin',
    `${FIXTURES}/index.js`,
  ],
  output: {
    path: '/',
    filename: 'compiled.js',
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.dust$/,
        loader: 'dust-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      dust: 'dustjs-linkedin'
    })
  ]
};

test.serial.cb('default', (t) => {
  const fs = new MemoryFS();
  const compiler = webpack(WEBPACK_CONFIG);
  compiler.outputFileSystem = fs;
  compiler.run(() => {
    const compiled = fs.readFileSync('/compiled.js', 'utf-8');
    eval(compiled);
    t.is(t.context.result, '<p>Hello,World!</p>')
    t.end();
  });
});

test.serial.cb('preserveWhitespace', (t) => {
  const fs = new MemoryFS();
  WEBPACK_CONFIG.module.rules[0].options = 'preserveWhitespace';
  const compiler = webpack(WEBPACK_CONFIG);
  compiler.outputFileSystem = fs;
  compiler.run(() => {
    const compiled = fs.readFileSync('/compiled.js', 'utf-8');
    eval(compiled);
    t.is(t.context.result, '<p>\n  Hello,\n  World!\n</p>\n')
    t.end();
  });
});

test.serial.cb('preserveWhitespaceOptionsObject', (t) => {
  const fs = new MemoryFS();
  WEBPACK_CONFIG.module.rules[0].options = {
    preserveWhitespace: true
  };
  WEBPACK_CONFIG.entry[1] =  `${FIXTURES}/templateDir/templateDir.js`;

  const compiler = webpack(WEBPACK_CONFIG);
  compiler.outputFileSystem = fs;
  compiler.run(() => {
    const compiled = fs.readFileSync('/compiled.js', 'utf-8');
    eval(compiled);
    t.true(compiled.indexOf("(function(dust){dust.register(\"tests\\/_fixtures_\\/templateDir\\/rootDirTemplate\",body_0);") !== -1)
    t.is(t.context.result, '<p>\n  Hello,\n  World!\n</p>\n')
    t.end();
  });
});

test.serial.cb('rootDirDefined', (t) => {
  const fs = new MemoryFS();
  WEBPACK_CONFIG.module.rules[0].options = {
    preserveWhitespace: true
  };
  WEBPACK_CONFIG.entry[1] =  `${FIXTURES}/templateDir/templateDir.js`;
  WEBPACK_CONFIG.module.rules[0].options = {
    rootDir: 'tests/_fixtures_/templateDir'
  };
  const compiler = webpack(WEBPACK_CONFIG);
  compiler.outputFileSystem = fs;
  compiler.run(() => {
    const compiled = fs.readFileSync('/compiled.js', 'utf-8');
    eval(compiled);
    t.true(typeof compiled === 'string')
    t.true(compiled.indexOf("(function(dust){dust.register(\"rootDirTemplate\",body_0);") !== -1)
    t.true(compiled.indexOf("(function(dust){dust.register(\"tests\/_fixtures_\/templateDir\/rootDirTemplate\",body_0);") === -1)
    t.is(t.context.result, '<p>\n  Hello,\n  World!\n</p>\n')
    t.end();
  });
});

