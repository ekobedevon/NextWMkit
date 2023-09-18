import { auth } from '@/auth/lucia'
import { LuciaError } from 'lucia'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405)
    const { display, password, confPass, icon } = req.body as {
        display: string
        password: string
        confPass: string
        icon: string
    }
	
    let updateDetails = { display: '', password: '', icon: '' }

    // basic check
    if (
        typeof display !== 'string' ||
        display.length < 1 ||
        display.length > 31
    ) {
        updateDetails.display = 'Invalid display'
    }
    if (
        typeof password !== 'string' ||
        password.length < 1 ||
        password.length > 255
    ) {
        updateDetails.password = 'Invalid password'
    }
    try {
        const authRequest = auth.handleRequest({
            req,
            res,
        })
        const session = await authRequest.validate()
		console.log('display below')
        console.log(display)
		console.log(session.user.display)
		if (display !== undefined)
            {
				if (
                    display !== session.user.display &&
                    (display.length > 1 || display.length < 31)
                ) {
                    console.log('2')
                    console.log(display)
                    const user = await auth.updateUserAttributes(
                        session.user.userId,
                        {
                            display: display,
                        } // expects partial `Lucia.DatabaseUserAttributes`
                    )
                    updateDetails.display = 'Updated'
                }
			}

        if (confPass === password) {
            const newKey = await auth.updateKeyPassword(
                'username',
                session.user.user_id.toLowerCase(),
                password
            )
            updateDetails.password = 'Updated'
            console.log(newKey)
        } else {
            updateDetails.password = 'Passwords Mismatch'
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
		console.log(e)
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
        if (e instanceof LuciaError && e.message === 'AUTH_INVALID_KEY_ID') {
            return res.status(400).json({
                error: 'Unexpected DB Error',
            })
        }
        return res.status(500).json({
            error: 'An unknown edrror occurre',
        })
    }
}

export default handler
