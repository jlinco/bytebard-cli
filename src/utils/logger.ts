import chalk from "chalk";

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.redBright(...args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellowBright(...args));
  },
  info(...args: unknown[]) {
    console.log(chalk.cyanBright(...args));
  },
  success(...args: unknown[]) {
    console.log(chalk.greenBright(...args));
  },
  break() {
    console.log("");
  },
};
