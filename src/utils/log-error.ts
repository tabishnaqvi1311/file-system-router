import chalk from "chalk";

export function logError(method: string, statusCode: number, filePath: string): void{
    console.log(chalk.red(`[${method}] - ${filePath} (${statusCode})`));
}