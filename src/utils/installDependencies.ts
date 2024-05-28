import chalk from 'chalk';
import { getUserPkgManager } from './getPackageManager.js';
import ora, { type Ora } from 'ora';
import { logger } from './logger.js';
import { execa } from 'execa';
import { writeProjectName } from '~/helpers/misc.js';

export async function installDependencies({
	projectDir,
	projectName,
}: {
	projectDir: string;
	projectName: string;
}) {
	const pkgManager = getUserPkgManager();
	const writeSpinner = ora().start();

	writeProjectName({ spinner: writeSpinner, projectName, projectDir });

	logger.info(
		`Installing dependencies for ${chalk.yellow.bold(projectDir)}...`,
	);
	const installSpinner = await runInstallScript(pkgManager, projectDir);
	(installSpinner ?? ora()).succeed(
		`Successfully installed dependencies for ${chalk.cyan.bold(projectDir)}`,
	);
}

const runInstallScript = async (
	pkgManager: string,
	projectDir: string,
): Promise<Ora | null> => {
	switch (pkgManager) {
		case 'npm':
			await execa(pkgManager, ['install'], {
				cwd: projectDir,
				stderr: 'inherit',
			});

			return null;
		default:
			return null;
	}
};
