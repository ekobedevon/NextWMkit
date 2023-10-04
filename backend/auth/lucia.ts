// lucia.ts
import { lucia } from 'lucia'
import { express } from 'lucia/middleware'
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql'
import {luciaClient} from '../db.js'


export const auth = lucia({
    adapter: postgresAdapter(luciaClient, {
        user: 'auth_user',
        key: 'user_key',
        session: 'user_session',
    }),
    env: 'DEV', // "PROD" if deployed to HTTPS
    middleware: express(),
    getUserAttributes: (data: any) => {
        return {
            display: data.display,
        }
    },
})

export type Auth = typeof auth
