// pages/api/signup.ts
import { auth } from '@/auth/lucia'

import type { NextApiRequest, NextApiResponse } from 'next'
import { PostgresError } from 'postgres'

const checkInvite = async (code: string): Promise<boolean> => {
    try {
        const url = `http://localhost:8080/invite/check?ID=${code}`

        const response = await fetch(url)

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`)
            return false // Return false or handle the error as needed
        }

        // Check if the response is JSON
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json()
            return data as boolean
        } else {
            console.error('Response is not JSON')
            return false // Return false or handle the error as needed
        }
    } catch (error) {
        console.error('Fetch error:', error)
        throw error // You can choose to handle or propagate the error as needed
    }
}
const updateInvite = async (code: string) => {
    try {
		const url = `${process.env.HTTPS === '1' ? 'https' : 'http'}://${
            process.env.WEB_URL
        }/invite/spoil?ID=${code}`
        //const url = `http://localhost:8080/invite/spoil?ID=${code}`

        const response = await fetch(url, { method: 'POST' })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        

        // Assuming the response is either true or false
        return true
    } catch (error) {
        console.error('Fetch error:', error)
        throw error // You can choose to handle or propagate the error as needed
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405)
    const { username, password, code } = req.body as {
        username: unknown
        password: unknown
        code: unknown
    }
    // basic check
    if (
        typeof username !== 'string' ||
        username.length < 4 ||
        username.length > 31
    ) {
        return res.status(400).json({
            error: 'Invalid username',
        })
    }
    if (
        typeof password !== 'string' ||
        password.length < 6 ||
        password.length > 255
    ) {
        return res.status(400).json({
            error: 'Invalid password',
        })
    }
    // const validCode = await checkInvite(code as string)
    // if (typeof code !== 'string' && validCode) {
    //     console.log('POOP')
    //     return res.status(402).json({
    //         error: 'Invalid Invite Code',
    //     })
    // }
    try {
        const user = await auth.createUser({
            key: {
                providerId: 'username', // auth method
                providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                password, // hashed by Lucia
            },
            attributes: {
                display: username.toLowerCase(),
                user_id: username.toLowerCase(),
            },
        })
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        })
        const authRequest = auth.handleRequest({
            req,
            res,
        })
        authRequest.setSession(session)
        // const bool = await updateInvite(code as string)
        // console.log(bool)
        return res.redirect(302, '/') // profile page
    } catch (e:any) {
        // this part depends on the database you're using
        // check for unique constraint error in user table
        //&& e.message === "unique_violation"
        
        if (e.message === 'unique_violation') {
            return res.status(400).json({
                error: 'Username already taken',
            })
        }

        return res.status(500).json({
            error: 'An unknown error occurred',
        })
    }
}

export default handler
