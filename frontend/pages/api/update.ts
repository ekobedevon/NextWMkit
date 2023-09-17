import { auth } from '@/auth/lucia'
import { LuciaError } from 'lucia'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405)
    const { username, password } = req.body as {
        username: unknown
        password: unknown
        confPass: unknown
        icon: unknown
    }
    // basic check
    if (
        typeof username !== 'string' ||
        username.length < 1 ||
        username.length > 31
    ) {
        return res.status(400).json({
            error: 'Invalid username',
        })
    }
    if (
        typeof password !== 'string' ||
        password.length < 1 ||
        password.length > 255
    ) {
        return res.status(400).json({
            error: 'Invalid password',
        })
    }
    try {
        const authRequest = auth.handleRequest({
            req,
            res,
        })
        const session = await authRequest.validate()
        if (username !== session.user.username) {
            const user = await auth.updateUserAttributes(
                session.user.userId,
                {
                    username: username,
                } // expects partial `Lucia.DatabaseUserAttributes`
            )
			const key = await auth.getKey('username', session.user.username)
			console.log("HERE")
			console.log(key)
			
        }


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
        return res.redirect(302, '/profile') // profile page
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
