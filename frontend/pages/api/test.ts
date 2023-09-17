import { auth } from '@/auth/lucia'
import { LuciaError } from 'lucia'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authRequest = auth.handleRequest({
            req,
            res,
        })
        const session = await authRequest.validate()
			const name = session.user.username
            const key = await auth.getKey('username', name.toLowerCase())
			const keys = await auth.getAllUserKeys(key.userId)
            console.log('HERE')
            console.log(key)
        

        // const key = await auth.updateKeyPassword(
        //     'username',
        //     username.toLowerCase(),
        //     password
        // )
        // const newSession = await auth.createSession({
        //     userId: key.userId,
        //     attributes: {},
        // })
        // const authRequest = auth.handleRequest({
        //     req,
        //     res,
        // })
        // authRequest.setSession(newSession)
        return res.send(keys)
    } catch (e: any) {
        if (
            e instanceof LuciaError &&
            (e.message === 'AUTH_INVALID_KEY_ID' ||
                e.message === 'AUTH_INVALID_PASSWORD')
        ) {
            // user does not exist
            // or invalid password
            return res.status(400).json({
                error: 'Incorrect username or password',
            })
        }
        return res.status(500).json({
            error: 'An unknown error occurred',
        })
    }
}

export default handler
