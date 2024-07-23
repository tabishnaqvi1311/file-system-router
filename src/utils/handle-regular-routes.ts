import { Request, Response } from "express";
import { logError } from "./log-error";
import { logSuccess } from "./log-success";

export async function handleRegularRoutes(filePath: string, req: Request, res: Response): Promise<any> {
    try {
        const module = await import(filePath)
        const httpVerb = req.method;
        let data = null;
        data = module[httpVerb] ? module[httpVerb](req, res) : module.handler(req, res);
        logSuccess(httpVerb, filePath);
        return data
    } catch (error: any) {
        //console.log(error.message)
        res.statusCode = 404;
        logError(req.method, res.statusCode, filePath)
        return false;
    }
}

