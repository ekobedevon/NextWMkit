import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { auth } from '@/auth/lucia'

export interface authCtx extends GetServerSidePropsContext {
    username: string
    icon: string
}

const redirectToLogin = async (
    ctx: authCtx,
    ssp: (ctx: authCtx) => Promise<GetServerSidePropsResult<any>>
) => {
    const authRequest = auth.handleRequest(ctx)
    const session = await authRequest.validate()

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }

    // Add the username and icon to the context
    ctx.username = session.user.username
    ctx.icon = session.user.icon

    return ssp(ctx)
}

export default redirectToLogin
