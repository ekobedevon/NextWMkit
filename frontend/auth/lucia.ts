import { lucia } from 'lucia'
import { nextjs } from 'lucia/middleware'
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql'
import client from '../db'

export const auth = lucia({
    adapter: postgresAdapter(client, {
        user: 'auth_user',
        key: 'user_key',
        session: 'user_session',
    }),
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD", // "PROD" if deployed to HTTPS
    middleware: nextjs(),
    getUserAttributes: (data) => {
        return {
            username: data.username,
        }
    },
})

export type Auth = typeof auth
