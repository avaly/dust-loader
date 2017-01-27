# [dust](https://github.com/linkedin/dustjs) loader for [webpack](http://webpack.github.io/)

Compiles dust templates and exports the compiled functions, allowing for rendering of the templates in a browser environment.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

```js
var template = require('dust!./file.dust');
// => returns file.dust compiled as template function
```

### Recommended config

```js
module.exports = {
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
  ],
};
```

Then you only need to write: `require('./file.dust')`

You can also preserve the whitespace in your template with the following loader config:

```js
{
  test: /\.dust$/,
  loader: 'dust-loader',
  query: 'preserveWhitespace'
}
```

### Rendering a template

You will need to bundle the [dust core](https://github.com/linkedin/dustjs/blob/master/dist/dust-core.js) in your pack in order to render the compiled templates.

```js
var tpl = require('./views/foo/bar.tpl');

// with dust <= 2.6
dust.render('views/foo/bar', context, function(err, result){
	// result holds the rendered HTML code
});
// with dust >= 2.7
dust.render(tpl, context, function(err, result){
	// result holds the rendered HTML code
});
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
