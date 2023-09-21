import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { auth } from '@/auth/lucia'

export interface authCtx extends GetServerSidePropsContext {
    display: string
    icon: string
	role: string
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
    // Add the username,icon, role to the context
    ctx.display = session.user.display
    ctx.icon = session.user.icon
	ctx.role = session.user.role

    return ssp(ctx)
}

export default redirectToLogin
