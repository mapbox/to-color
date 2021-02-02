import babel from 'rollup-plugin-babel';

export default {
  input: ['src/index.js'],
  output: [
    {
      name: 'toColor',
      file: 'dist/to-color.js',
      format: 'umd'
    }, {
      name: 'toColor',
      file: 'demo/to-color.js',
      format: 'umd',
      sourcemap: true
    }
  ],
  treeshake: true,
  plugins: [
    babel()
  ]
};
