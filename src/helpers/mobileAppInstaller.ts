import chalk from "chalk";
import ora from "ora";
import path from "path";
import * as p from "@clack/prompts";
import { PKG_ROOT } from "~/consts.js";
import { logger } from "~/utils/logger.js";
import { copyFiles } from "./copyFiles.js";

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
  logger.info(
    `\n\n${chalk.yellow.bold(
      "Before proceeding, please make sure you have done the following:"
    )}\n\n`
  );

  logger.info(
    `\t${chalk.cyanBright(
      "1. Setup your development environment as described in:"
    )} ${chalk.yellowBright.bold.underline(
      "https://reactnative.dev/docs/environment-setup"
    )}
    `
  );
  logger.info(
    `\t${chalk.cyanBright(
      "2. Ensured that your development setup in 1 above matches your development OS and target OS. Refer to:"
    )} ${chalk.yellowBright.bold.underline(
      "https://reactnative.dev/docs/environment-setup"
    )} ${chalk.cyanBright(
      "for more information on how to do this."
    )}
    `
  );
  logger.warn(
    `\t${chalk.red.bold(
      "3. YOU DON'T NEED TO RUN THE COMMAND LINE INTERFACE TO START A NEW PROJECT, SINCE WE WILL HANDLE THIS FOR YOU."
    )}
    `
  )

  const confirmDependencyInstallation = await p.select({
    message: "Please confirm if you have successfully setup your development environment?",
    options:[
      {
        label: `Yes - (Dev setup complete)`,
        value: "yes"
      },
      {
        label: `No - (Dev setup incomplete)`,
        value: "no"
      }
    ]
  })

  if (confirmDependencyInstallation && confirmDependencyInstallation === 'no') {
    logger.error(
      `\n\n${chalk.red.bold(
        "Please ensure you have completed the dev setup before proceeding."
      )}\n\n`
    )
    process.exit(1)
  } else {
     const srcDir = path.join(PKG_ROOT, "template/mobileApp");
     const spinner = ora("Scaffolding your mobile app .... \n").start();
     logger.info(`Creating ${chalk.yellow.bold(projectName)} .....\n\n`);

     await copyFiles({
       spinner,
       srcDir,
       projectDir,
       projectName,
       appDir,
       workingFolder,
     });
  }
  
};
