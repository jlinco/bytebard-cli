import { Command } from "commander";
import { logger } from "../utils/logger.js";
import path from "path";
import { existsSync } from "fs";
import { z } from "zod";
import { installDependencies } from "~/utils/installDependencies.js";
import { createProject } from "~/utils/scaffoldProject.js";
import { renderHeader } from "~/utils/renderHeader.js";
import { typeOfProjectPrompt } from "~/utils/prompts.js";
import chalk from "chalk";

const initCommandOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  defaults: z.boolean(),
});

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-d, --defaults", "use default configuration", false)
  .requiredOption(
    "-c, --cwd <folder/to/run/your/project>",
    "the working directory. defaults to the current directory"
  )
  .action(async (opts) => {
    renderHeader();
    try {
      const options = initCommandOptionsSchema.parse(opts);
      const workingFolder = path.resolve(options.cwd);
      if (!existsSync(workingFolder)) {
        logger.error(
          `The path ${workingFolder} does not exist. Please try again`
        );
        process.exit();
      }

      const projectType = await typeOfProjectPrompt();
      const { projectDir, projectName } = await createProject({
        projectType,
        workingFolder,
      });
      await installDependencies({ projectDir, projectName });

      if (projectType === "webApp") {
        logger.success("___________________\n");
        logger.success(
          `${chalk.green(
            projectName
          )} has been created successfully.\n\nNow run the following in your terminal:\n`
        );
        logger.info(
          `${chalk.cyanBright.bold(
            "cd " + projectDir
          )} -> to navigate to the project folder\n\n`
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
    } catch (error) {
      logger.info("we have an error here....");
      logger.error("error", error);
    }
  });
