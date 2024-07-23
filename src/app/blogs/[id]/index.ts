import { Request, Response } from "express"

export const GET = (req: Request, res: Response) => {
    //console.log(req.params)
    return `this is a blog with id ${req.params.id}`
}