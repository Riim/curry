import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/curry.js',

	format: 'umd',
	moduleName: 'curry',

	dest: 'dist/curry.js',

	plugins: [
		eslint(),
		babel({
			exclude: 'node_modules/**'
		})
	]
};
