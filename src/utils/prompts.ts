import chalk from 'chalk';
import { DEFAULT_APP_NAME } from '~/consts.js';
import { logger } from './logger.js';
import * as p from '@clack/prompts';
import type { ProjectType } from './scaffoldProject.js';

export async function typeOfProjectPrompt() {
	const typeOfProject: ProjectType | unknown = await p.select({
		message: 'What type of project do you want to create?',
		options: [
			{
				label: `Web App - ${chalk.cyan.bold(
					'React, Tanstack Router, Tanstack Query',
				)}`,
				value: 'webApp',
			},
			{
				label: `Mobile App - ${chalk.cyan.bold('React Native')}`,
				value: 'mobileApp',
			},
			{
				label: `Cross Platform App - ${chalk.cyan.bold('React Native & Expo')}`,
				value: 'crossPlatformApp',
			},
		],
		initialValue: 'webApp',
	});
	return typeOfProject;
}

export async function promptProject() {
	const sessionPrompt = await p.group(
		{
			projectName: () =>
				p.text({
					message: 'Please enter your project name:',
					placeholder: 'my-project',
					initialValue: `${DEFAULT_APP_NAME}`,
				}),
			appDir: () =>
				p.text({
					message: 'Please enter your directory name:',
					placeholder: 'my-project-folder',
					initialValue: `${DEFAULT_APP_NAME}`,
				}),
		},
		{
			onCancel: () => {
				logger.info('Project creation canceled');
				p.cancel('Operation cancelled');
				process.exit(0);
			},
		},
	);
	return sessionPrompt;
}

export async function promptWorkingFolder() {
	const workingFolder: string | unknown = await p.text({
		message: `Please enter your working directory. ${chalk.yellowBright.bold(
			'Please provide the full path to your project folder or type ./ to use your current directory',
		)}:`,
		placeholder: `/full/path/projects/your-working-folder ${chalk.cyanBright(
			'OR',
		)} ./`,
	});
	return workingFolder;
}
