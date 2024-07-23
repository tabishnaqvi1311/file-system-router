import chalk from "chalk";

export function logSuccess(method: string, filePath: string): void{
    console.log(chalk.cyan(`[${method}] - ${filePath}`))
}