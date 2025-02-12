import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import image from "@rollup/plugin-image";
import dotenv from "dotenv";
import replace from "@rollup/plugin-replace";

const production = !process.env.ROLLUP_WATCH;
dotenv.config()

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({
			API_KEY: 				JSON.stringify(process.env.apiKey),
			AUTH_DOMAIN : 			JSON.stringify(process.env.authDomain),
			PROJECT_ID : 			JSON.stringify(process.env.projectId),
			STORAGE_BUCKET : 		JSON.stringify(process.env.storageBucket),
			MESSAGING_SENDER_ID : 	JSON.stringify(process.env.messagingSenderId),
			APP_ID : 				JSON.stringify(process.env.appId),
			MEASUREMENT_ID : 		JSON.stringify(process.env.measurementId),
			IMGBB_KEY : 			JSON.stringify(process.env.IMGBB_API_KEY),
		}),
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		//image loader plugin
		image(),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
