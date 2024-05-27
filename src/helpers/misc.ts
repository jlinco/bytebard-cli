import chalk from 'chalk';
import fs from 'fs-extra';
import { logger } from '~/utils/logger.js';

export function checkFolderExists (folder: string) {
  if (!fs.existsSync(folder)) {
    logger.error(`${chalk.red.bold(folder)}: ${chalk.red('Does not exist. Please try again!')}`)
    return false
  }
  return true
}

export function runSuccessMessage(projectName: string, projectDir: string) {
  logger.success("___________________\n");
  logger.success(
    `${chalk.greenBright.bold(
      projectName
    )} has been created successfully.\n\nNow run the following in your terminal:\n`
  );
  logger.info(
    `${chalk.cyanBright.bold(
      "cd " + projectDir
    )} -> to navigate to the project folder\n\n`
  );
  logger.info(
    `${chalk.cyanBright.bold("npm install")} -> to install all dependencies\n\n`
  );
  logger.info(
    `${chalk.cyanBright.bold(
      "npm run dev"
    )} -> to start the development server\n\n`
  );
  logger.info(
    `${chalk.cyanBright.bold(
      "npm run build"
    )} -> to build a production version of your application\n\n`
  );
  logger.success("Happy coding!!!!!\n\n");
  logger.success("___________________\n\n");
}