import { Request, Response } from "express";

async function handleRegularRoutes(filePath: string, req: Request, res: Response) {
    try {
        const module = await import(filePath)
        const httpVerb = req.method;
        let data = null;
        data = module[httpVerb] ? module[httpVerb](req, res) : module.handler(req, res);
        return data
    } catch (error) {
        console.log(error);
        res.statusCode = 404;
        return false;
    }
}


export { handleRegularRoutes }