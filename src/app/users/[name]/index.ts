import { Request, Response } from "express";

export const GET = (req:Request, res:Response) => {
    return `this is user with name ${req.params.name}`
}