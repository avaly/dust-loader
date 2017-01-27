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
    loaders: [
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
  WEBPACK_CONFIG.module.loaders[0].query = 'preserveWhitespace';
  const compiler = webpack(WEBPACK_CONFIG);
  compiler.outputFileSystem = fs;
  compiler.run(() => {
    const compiled = fs.readFileSync('/compiled.js', 'utf-8');
    eval(compiled);
    t.is(t.context.result, '<p>\n  Hello,\n  World!\n</p>\n')
    t.end();
  });
});
