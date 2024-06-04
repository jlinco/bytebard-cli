import { Command } from 'commander';
import { logger } from '../utils/logger.js';
import path from 'node:path';
import { z } from 'zod';
import { createProject } from '~/utils/scaffoldProject.js';
import { renderHeader } from '~/utils/renderHeader.js';
import { promptWorkingFolder, typeOfProjectPrompt } from '~/utils/prompts.js';
import { checkFolderExists } from '~/helpers/misc.js';

const initCommandOptionsSchema = z.object({
	cwd: z.string(),
	yes: z.boolean(),
	defaults: z.boolean(),
});

export const init = new Command()
	.name('init')
	.description('initialize your project and install dependencies')
	.option('-y, --yes', 'skip confirmation prompt.', false)
	.option('-d, --defaults', 'use default configuration', false)
	.requiredOption('-c, --cwd <folder/to/run/your/project>')
	.action(async (opts) => {
		renderHeader();
		try {
			const options = initCommandOptionsSchema.parse(opts);
			let workingFolder = path.resolve(options.cwd);
			const folderExists = checkFolderExists(workingFolder);
			if (!folderExists) {
				const retryFolder: string | unknown = await promptWorkingFolder();
				workingFolder = path.resolve(retryFolder as string);
			}

			const projectType = await typeOfProjectPrompt();
			await createProject({
				projectType,
				workingFolder,
			});

			process.exit();
		} catch (error) {
			logger.info('we have an error here....');
			logger.error(error);
			process.exit();
		}
	});
