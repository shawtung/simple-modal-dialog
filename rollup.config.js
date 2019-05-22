import babel from 'rollup-plugin-babel'
import css from 'rollup-plugin-css-only'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'SimpleModal',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    css(),
  ],
}
