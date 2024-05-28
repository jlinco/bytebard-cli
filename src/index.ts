#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init.js';
// import { renderHeader } from "./utils/renderHeader.js";

async function main() {
	const program = new Command()
		.name('cli-platform')
		.description('set up your fe stack')
		.version('1.0.0', '-v, --version', 'display version number');

	program.addCommand(init);
	program.parse();
}

main();
