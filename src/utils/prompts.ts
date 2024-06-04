import chalk from 'chalk';
import * as p from '@clack/prompts';
import type { ProjectType } from './scaffoldProject.js';

export async function typeOfProjectPrompt() {
	p.intro(
		`${chalk.greenBright.bold(
			"Welcome to bytebard CLI. Let's get started...",
		)}`,
	);
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
	});

	if (p.isCancel(typeOfProject)) {
		p.cancel('Operation cancelled');
		p.outro(`${chalk.redBright.bold('Exiting the CLI!')}`);
		process.exit(0);
	}
	return typeOfProject;
}

export async function promptProject() {
	const sessionPrompt = await p.group(
		{
			projectName: () =>
				p.text({
					message: 'Please enter your project name:',
					placeholder: 'my-project',
					validate: (value) => {
						if (value.length === 0) return 'A project name is required';
						return;
					},
				}),
			appDir: () =>
				p.text({
					message: 'Please enter your directory name:',
					placeholder: 'my-project-folder',
					validate: (value) => {
						if (value.length === 0) return 'A directory name is required';
						return;
					},
				}),
		},
		{
			onCancel: () => {
				p.cancel('Operation cancelled');
				p.outro(`${chalk.redBright.bold('Exiting the CLI!')}`);
				process.exit(0);
			},
		},
	);
	if (p.isCancel(sessionPrompt)) {
		p.cancel('Operation cancelled');
		p.outro(`${chalk.redBright.bold('Exiting the CLI!')}`);
		process.exit(0);
	}
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
	if (p.isCancel(workingFolder)) {
		p.cancel('Operation cancelled');
		p.outro(`${chalk.redBright.bold('Exiting the CLI!')}`);
		process.exit(0);
	}
	return workingFolder;
}
