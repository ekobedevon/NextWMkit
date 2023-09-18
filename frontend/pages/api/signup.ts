// pages/api/signup.ts
import { auth } from '@/auth/lucia';

import type { NextApiRequest, NextApiResponse } from 'next';
import { PostgresError } from 'postgres';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') return res.status(405);
	const { username, password } = req.body as {
		username: unknown;
		password: unknown;
	};
	// basic check
	if (typeof username !== 'string' || username.length < 4 || username.length > 31) {
		return res.status(400).json({
			error: 'Invalid username'
		});
	}
	if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
		return res.status(400).json({
			error: 'Invalid password'
		});
	}
	try {
		const user = await auth.createUser({
            key: {
                providerId: 'username', // auth method
                providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                password, // hashed by Lucia
            },
            attributes: {
                display: username,
                icon: 'GiCowled',
            },
        })
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest({
			req,
			res
		});
		authRequest.setSession(session);
		return res.redirect(302, '/'); // profile page
	} catch (e) {
		// this part depends on the database you're using
		// check for unique constraint error in user table
		//&& e.message === "unique_violation"
		if (e instanceof PostgresError && e.message === 'unique_violation') {
			return res.status(400).json({
				error: 'Username already taken'
			});
		}

		return res.status(500).json({
			error: 'An unknown error occurred'
		});
	}
};

export default handler;
