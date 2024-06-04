import chalk from 'chalk';
import fs from 'fs-extra';
import * as p from '@clack/prompts';
export const copyFiles = async ({
	spinner,
	srcDir,
	projectDir,
	projectName,
	appDir,
	workingFolder,
}: {
	spinner: {
		start: (message?: string) => void;
		stop: (message?: string) => void;
		message: (message: string) => void;
	};
	srcDir: string;
	projectDir: string;
	projectName: string;
	appDir: string;
	workingFolder: string;
}) => {
	if (!appDir) {
		p.cancel('Project creation failed');
		process.exit();
	}

	if (fs.existsSync(projectDir)) {
		if (fs.readdirSync(projectDir).length === 0) {
			if (projectName !== '.')
				p.log.info(
					`${chalk.cyan.bold(
						projectName,
					)} already exists but is empty, continuing...\n`,
				);
		} else {
			// spinner.stopAndPersist();
			spinner.message('Waiting while you select an option');
			const overwriteDir = await p.select({
				message: `${chalk.redBright.bold('Warning:')} ${chalk.cyan.bold(
					projectName,
				)} already exists and isn't empty. How would you like to proceed?`,
				options: [
					{
						label: 'Abort installation (recommended)',
						value: 'abort',
					},
					{
						label: 'Clear the directory and continue',
						value: 'clear',
					},
					{
						label: 'Continue installation and overwrite conflicting files',
						value: 'overwrite',
					},
				],
				initialValue: 'abort',
			});
			if (overwriteDir === 'abort') {
				spinner.stop();
				p.cancel('Project creation failed');
				process.exit(1);
			}
			spinner.message('Confirming overwrite');
			const overwriteAction =
				overwriteDir === 'clear'
					? 'clear the directory'
					: 'overwrite conflicting files';
			const confirmOverwrite = await p.confirm({
				message: `Are you sure you want to ${overwriteAction}?`,
				initialValue: false,
			});
			if (!confirmOverwrite) {
				spinner.stop();
				p.cancel('Aborting installation...');
				process.exit(1);
			}
			if (overwriteDir === 'clear') {
				p.log.info(
					`Emptying ${chalk.cyan.bold(projectName)} and creating your app...\n`,
				);
				fs.emptyDirSync(appDir);
			}
		}
	}
	spinner.message('Copying files....');
	fs.copySync(srcDir, projectDir);

	const scaffoldedName =
		projectName === '.' ? 'App' : chalk.cyan.bold(projectName);

	spinner.stop(
		`Successfully created ${scaffoldedName} at ${chalk.cyan.bold(
			workingFolder,
		)}\n`,
	);
};
