import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { auth } from '@/auth/lucia'

const redirectToLogin = async (
    ctx: GetServerSidePropsContext,
    ssp: (ctx: GetServerSidePropsContext) => Promise<
        GetServerSidePropsResult<any>
    >
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
	return ssp(ctx)
}

export default redirectToLogin