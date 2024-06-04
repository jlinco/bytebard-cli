import chalk from 'chalk';
import fs from 'fs-extra';
import type { PackageJson } from 'type-fest';
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
 * Write project name to package.json
 *
 * @export
 * @param {{
 * 	projectName: string;
 * 	projectDir: string;
 * }} param0
 * @param {string} param0.projectName
 * @param {string} param0.projectDir
 */
export function writeProjectName({
	projectName,
	projectDir,
}: {
	projectName: string;
	projectDir: string;
}) {
	const pkgJson = fs.readJSONSync(
		path.join(projectDir, 'package.json'),
	) as AppPkgJSON;
	pkgJson.name = projectName;
	fs.writeJSONSync(path.join(projectDir, 'package.json'), pkgJson, {
		spaces: 2,
	});
}
