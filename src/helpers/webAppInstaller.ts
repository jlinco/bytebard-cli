import chalk from 'chalk';
import path from 'node:path';
import * as p from '@clack/prompts';
import { PKG_ROOT } from '~/consts.js';
import { copyFiles } from './copyFiles.js';
import { writeProjectName } from './misc.js';

export const webAppInstaller = async ({
	appDir,
	projectDir,
	projectName,
	workingFolder,
}: {
	appDir: string;
	projectDir: string;
	projectName: string;
	projectType: string;
	workingFolder: string;
}) => {
	const srcDir = path.join(PKG_ROOT, 'template/webApp');
	const spinner = p.spinner();
	spinner.start();
	spinner.message(`Creating ${chalk.yellow.bold(projectName)} .....\n\n`);

	await copyFiles({
		spinner,
		srcDir,
		projectDir,
		projectName,
		appDir,
		workingFolder,
	});

	writeProjectName({ projectName, projectDir });
	const instructions = `${chalk.whiteBright.bold(
		'Run the commands below to get started: ',
	)}\n ▶️ ${chalk.cyanBright.bold(
		`cd ${projectDir}`,
	)} -> to navigate to the project folder\n ▶️ ${chalk.cyanBright.bold(
		'npm install',
	)} -> to install all dependencies\n ▶️ ${chalk.cyanBright.bold(
		'npm run dev',
	)} -> to start the development server\n ▶️ ${chalk.cyanBright.bold(
		'npm run build',
	)} -> to build a production version of your application\n`;
	p.note(
		instructions,
		`${chalk.greenBright.bold('Project created successfully')}`,
	);
	process.exit(0);
};
