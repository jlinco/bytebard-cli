import chalk from 'chalk';
import ora from 'ora';
import path from 'node:path';
import { PKG_ROOT } from '~/consts.js';
import { logger } from '~/utils/logger.js';
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
	const spinner = ora('Scaffolding project.........\n').start();
	logger.info(`Creating ${chalk.yellow.bold(projectName)} .....\n\n`);

	await copyFiles({
		spinner,
		srcDir,
		projectDir,
		projectName,
		appDir,
		workingFolder,
	});

	writeProjectName({ spinner, projectName, projectDir });
};
