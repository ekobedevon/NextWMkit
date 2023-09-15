import { auth } from '../auth/lucia.js'
import { Request,Response,NextFunction } from 'express'

const authCheck = async (req:Request, res:Response, next:NextFunction) => {
    const authRequest = auth.handleRequest(req, res)
    const session = await authRequest.validate()
    if (!session) {
        res.sendStatus(401)
    } else {
        res.locals.session = session
        next()
    }
}

export default authCheck
