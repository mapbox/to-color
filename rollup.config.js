import babel from 'rollup-plugin-babel';

export default {
  input: ['index.js'],
  output: [
    {
      name: 'toColor',
      file: 'dist/to-color.js',
      format: 'umd',
      sourcemap: true
    }
  ],
  treeshake: true,
  plugins: [
    babel()
  ]
};
