import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);
const plugins = [
  vue({
    css: true,
  }),
  babel(babelrc())
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify({}, minify));
} 

export default {
  input: 'lib/index.js',
  output: [
    {
      name: 'searchBox',
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    // {
    //   name: 'searchBox',
    //   file: pkg.module,
    //   format: 'es',
    //   sourcemap: true,
    // },
  ],
  plugins,
  external
};