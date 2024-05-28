import chalk from 'chalk';
import fs from 'fs-extra';
import type { PackageJson } from 'type-fest';
import type { Ora } from 'ora';
import { logger } from '~/utils/logger.js';
import path from 'node:path';

type AppPkgJSON = PackageJson;
/**
 * checkFolderExists:
 * check if a folder exists
 *
 * @export
 * @param {string} folder
 * @returns {boolean}
 */
export function checkFolderExists(folder: string) {
	if (!fs.existsSync(folder)) {
		logger.error(
			`🚨🚨 ${chalk.red.bold(folder)}: ${chalk.red(
				'Does not exist. Please try again!',
			)} 🚨🚨`,
		);
		return false;
	}
	return true;
}

/**
 * runSuccessMessage:
 * display success message after project creation
 *
 * @export
 * @param {string} projectName
 * @param {string} projectDir
 */
export function runSuccessMessage(projectName: string, projectDir: string) {
	logger.success('\n✅ ✅\n');
	logger.success(
		`${chalk.greenBright.bold(
			projectName,
		)} has been created successfully.\n\nNow run the following in your terminal:\n`,
	);
	logger.info(
		`${chalk.cyanBright.bold(
			`cd ${projectDir}`,
		)} -> to navigate to the project folder\n\n`,
	);
	logger.info(
		`${chalk.cyanBright.bold(
			'npm install',
		)} -> to install all dependencies\n\n`,
	);
	logger.info(
		`${chalk.cyanBright.bold(
			'npm run dev',
		)} -> to start the development server\n\n`,
	);
	logger.info(
		`${chalk.cyanBright.bold(
			'npm run build',
		)} -> to build a production version of your application\n\n`,
	);
	logger.success('✅ ✅ Happy coding!!!!!✅ ✅\n\n');
}

/**
 * writeProjectName:
 * write the project name to package.json
 *
 * @export
 * @param {{
 *   spinner: Ora
 *   projectName: string
 *   projectDir: string
 * }} param0
 * @param {Ora} param0.spinner
 * @param {string} param0.projectName
 * @param {string} param0.projectDir
 */
export function writeProjectName({
	spinner,
	projectName,
	projectDir,
}: {
	spinner: Ora;
	projectName: string;
	projectDir: string;
}) {
	spinner.info(`Writing project name to ${chalk.dim('package.json')}...`);

	const pkgJson = fs.readJSONSync(
		path.join(projectDir, 'package.json'),
	) as AppPkgJSON;
	pkgJson.name = projectName;
	fs.writeJSONSync(path.join(projectDir, 'package.json'), pkgJson, {
		spaces: 2,
	});
	spinner.succeed(
		`Successfully written ${chalk.cyan.bold(projectName)} to ${chalk.dim(
			'package.json',
		)}`,
	);
}
