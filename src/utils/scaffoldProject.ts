import chalk from 'chalk';
import path from 'node:path';
import { logger } from './logger.js';
import { promptProject } from './prompts.js';
import { webAppInstaller } from '~/helpers/webAppInstaller.js';
import { mobileAppInstaller } from '~/helpers/mobileAppInstaller.js';

export type ProjectType = 'webApp' | 'mobileApp' | 'crossPlatformApp';
export async function createProject({
	projectType,
	workingFolder,
}: {
	projectType: ProjectType | unknown;
	workingFolder: string;
}) {
	const { projectName, appDir } = await promptProject();
	const projectDir = path.join(workingFolder, appDir);
	projectType === 'webApp' &&
		(await webAppInstaller({
			appDir,
			projectDir,
			projectName,
			projectType,
			workingFolder,
		}));

	projectType === 'mobileApp' &&
		(await mobileAppInstaller({
			appDir,
			projectDir,
			projectName,
			workingFolder,
		}));

	if (projectType === 'crossPlatformApp') {
		logger.info(
			`Cross-Platform App: ${chalk.yellow(
				"We'll be bringing the setup for this soon",
			)}`,
		);
		logger.info('Exiting...');
		process.exit(1);
	}

	return {
		projectDir,
		projectName,
		projectType,
	};
}
