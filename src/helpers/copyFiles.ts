import chalk from "chalk";
import fs from "fs-extra";
import { Ora } from "ora";
import * as p from "@clack/prompts";
export const copyFiles = async ({
  spinner,
  srcDir,
  projectDir,
  projectName,
  appDir,
  workingFolder,
}: {
  spinner: Ora;
  srcDir: string;
  projectDir: string;
  projectName: string;
  appDir: string;
  workingFolder: string;
}) => {
  if (!appDir) {
    spinner.fail("Project creation failed");
    process.exit();
  }

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
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
          `Emptying ${chalk.cyan.bold(projectName)} and creating your app...\n`
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
};
