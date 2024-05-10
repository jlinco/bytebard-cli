import chalk from "chalk";
import { getUserPkgManager } from "./getPackageManager.js";
import ora, { type Ora } from "ora";
import { logger } from "./logger.js";
import { execa } from "execa";
import { type PackageJson } from "type-fest";
import fs from "fs-extra";
import path from "path";

type AppPkgJSON = PackageJson;

export async function installDependencies({
  projectDir,
  projectName,
}: {
  projectDir: string;
  projectName: string;
}) {
  logger.info(`Writing project name to ${chalk.yellow("package.json")}...`);
  const pkgManager = getUserPkgManager();

  // write project name to package.json
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as AppPkgJSON;
  pkgJson.name = projectName;

  // TO DO add pnpm support

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  logger.info(
    `Installing dependencies for ${chalk.yellow.bold(projectDir)}...`
  );
  const installSpinner = await runInstallScript(pkgManager, projectDir);
  (installSpinner ?? ora()).succeed(
    `Successfully installed dependencies for ${chalk.cyan.bold(projectDir)}`
  );
}

const runInstallScript = async (
  pkgManager: string,
  projectDir: string
): Promise<Ora | null> => {
  switch (pkgManager) {
    case "npm":
      await execa(pkgManager, ["install"], {
        cwd: projectDir,
        stderr: "inherit",
      });

      return null;
    default:
      return null;
  }
};
