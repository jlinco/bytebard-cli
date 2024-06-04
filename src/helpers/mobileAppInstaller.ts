import chalk from 'chalk';
import path from 'node:path';
import * as p from '@clack/prompts';
import { PKG_ROOT } from '~/consts.js';
import { copyFiles } from './copyFiles.js';
import { writeProjectName } from './misc.js';

export const mobileAppInstaller = async ({
	appDir,
	projectName,
	projectDir,
	workingFolder,
}: {
	appDir: string;
	projectName: string;
	projectDir: string;
	workingFolder: string;
}) => {
	// provide info on certain prerequisites needed for working
	// on mobile apps
	p.log.message(
		`${chalk.white.bold(
			'Before proceeding, please make sure you have done the following:',
		)}`,
	);

	p.log.step(
		`${chalk.cyan(
			'1. Setup your development environment as described in: ',
		)} ${chalk.white.bold.underline(
			'https://reactnative.dev/docs/environment-setup',
		)}
		`,
	);
	p.log.step(
		`${chalk.cyan(
			'2. Ensured that your development setup in 1 above matches your development OS and target OS. Refer to:  for more information on how to do this.',
		)} ${chalk.white.bold.underline(
			'https://reactnative.dev/docs/environment-setup',
		)} ${chalk.cyan('for more information on how to do this.')}
		`,
	);
	p.log.step(
		`${chalk.cyan.bold(
			"3. YOU DON'T NEED TO RUN THE COMMAND LINE INTERFACE TO START A NEW PROJECT, SINCE WE WILL HANDLE THIS FOR YOU.",
		)}
		`,
	);

	const confirmDependencyInstallation = await p.select({
		message: `${chalk.cyan(
			'Confirm that your development environment is setup: ',
		)}`,
		options: [
			{
				label: 'Yes - (Dev setup complete)',
				value: 'yes',
			},
			{
				label: 'No - (Dev setup incomplete)',
				value: 'no',
			},
		],
	});
	if (p.isCancel(confirmDependencyInstallation)) {
		p.cancel(
			`${chalk.yellowBright.bold(
				'Dependency check cancelled. Sorry, but we cannot continue until you have confirmed all dependencies are installed',
			)}`,
		);
		p.outro(`${chalk.redBright.bold('Exiting the CLI!')}`);
		process.exit(0);
	}

	if (confirmDependencyInstallation && confirmDependencyInstallation === 'no') {
		p.cancel(
			`\n\n${chalk.red.bold(
				'Please ensure you have completed the dev setup before proceeding.',
			)}\n\n`,
		);
		p.outro(`${chalk.redBright.bold('Exiting the CLI!')}`);
		process.exit(1);
	}
	const srcDir = path.join(PKG_ROOT, 'template/mobileApp');
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
	const postInstallDefaultInstructions = `${chalk.whiteBright.bold(
		'Do the following below to get started:',
	)}\n\nRun instructions for Android:\n ${chalk.whiteBright.bold(
		'• Have an Android emulator running (quickest way to get started), or a device connected.',
	)}\n ${chalk.whiteBright.bold(
		`• cd ${projectDir} && npx react-native run-android`,
	)}\n\nRun instructions for iOS:\n ${chalk.whiteBright.bold(
		`• cd ${projectDir}/ios`,
	)}\nInstall Cocoapods\n ${chalk.whiteBright.bold(
		'• bundle install # you need to run this only once in your project.',
	)}\n ${chalk.whiteBright.bold(
		'• bundle exec pod install',
	)}\n ${chalk.whiteBright.bold('• cd ..')}\n ${chalk.whiteBright.bold(
		'• npx react-native run-ios',
	)}`;
	p.note(
		postInstallDefaultInstructions,
		`${chalk.greenBright.bold('Project created successfully')}`,
	);
	p.outro(`${chalk.greenBright.bold('Exiting the CLI!')}`);
	process.exit(0);
};
