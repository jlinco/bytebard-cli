import chalk from "chalk";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import * as p from "@clack/prompts";
import { logger } from "./logger.js";
import ora from "ora";
import fs from "fs-extra";
import { promptProject } from "./prompts.js";

export type ProjectType = "webApp" | "mobileApp" | "crossPlatformApp";
export async function createProject({
  projectType,
  workingFolder,
}: {
  projectType: ProjectType | unknown;
  workingFolder: string;
}) {
  const { projectName, appDir } = await promptProject();
  const projectDir = path.join(workingFolder, appDir);

  // extract to separate function
  if (projectType === "webApp") {
    const srcDir = path.join(PKG_ROOT, "template/webApp");
    const spinner = ora("Scaffolding project.........\n").start();
    logger.info(
      `Creating your ${chalk.cyan.bold(
        projectType
      )} with project name: ${chalk.cyan.bold(projectName)}\n`
    );
    logger.info(`at ${chalk.yellow.bold(projectDir)}...\n\n`);

    if (!appDir) {
      spinner.fail("Project creation failed");
      process.exit();
    }

    if (fs.existsSync(projectDir)) {
      if (fs.readdirSync(projectDir).length === 0) {
        logger.info("...we are here.. no app content");
        if (projectName !== ".")
          spinner.info(
            `${chalk.cyan.bold(
              projectName
            )} already exists but is empty, continuing...\n`
          );
      } else {
        spinner.stopAndPersist();
        const overwriteDir = await p.select({
          message: `${chalk.redBright.bold("Warning:")} ${chalk.cyan.bold(
            projectName
          )} already exists and isn't empty. How would you like to proceed?`,
          options: [
            {
              label: "Abort installation (recommended)",
              value: "abort",
            },
            {
              label: "Clear the directory and continue",
              value: "clear",
            },
            {
              label: "Continue installation and overwrite conflicting files",
              value: "overwrite",
            },
          ],
          initialValue: "abort",
        });
        if (overwriteDir === "abort") {
          spinner.fail("Project creation failed");
          process.exit(1);
        }

        const overwriteAction =
          overwriteDir === "clear"
            ? "clear the directory"
            : "overwrite conflicting files";
        const confirmOverwrite = await p.confirm({
          message: `Are you sure you want to ${overwriteAction}?`,
          initialValue: false,
        });
        if (!confirmOverwrite) {
          spinner.fail("Aborting installation...");
          process.exit(1);
        }
        if (overwriteDir === "clear") {
          spinner.info(
            `Emptying ${chalk.cyan.bold(
              projectName
            )} and creating your app...\n`
          );
          fs.emptyDirSync(appDir);
        }
      }
    }
    spinner.start();
    fs.copySync(srcDir, projectDir);

    const scaffoldedName =
      projectName === "." ? "App" : chalk.cyan.bold(projectName);

    spinner.succeed(
      `Successfully created ${scaffoldedName} at ${chalk.cyan.bold(
        workingFolder
      )}\n`
    );
  }

  if (projectType === "mobileApp") {
    logger.info(
      `Mobile App: ${chalk.yellow("We'll be bringing the setup for this soon")}`
    );
    logger.info(`Exiting...`);
    process.exit();
  }

  if (projectType === "crossPlatformApp") {
    logger.info(
      `Cross-Platform App: ${chalk.yellow(
        "We'll be bringing the setup for this soon"
      )}`
    );
    logger.info(`Exiting...`);
    process.exit();
  }

  return {
    projectDir,
    projectName,
    projectType,
  };
}
