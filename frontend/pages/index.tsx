// pages/index.tsx
import { auth } from '@/auth/lucia'
import { useRouter } from 'next/router'
import redirectToLogin from '../utils/redirectToLogin'

import type {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    InferGetServerSidePropsType,
} from 'next'

export const getServerSideProps = async (
    ctx: GetServerSidePropsContext
): Promise<
    GetServerSidePropsResult<{
        userId: string
        username: string
    }>
> =>
    redirectToLogin(ctx, async (ctx) => {
        const authRequest = auth.handleRequest(ctx)
        const session = await authRequest.validate()
        return {
            props: {
                userId: session.user.userId,
                username: session.user.username,
            },
        }
    })

const Page = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const router = useRouter()
    return (
        <>
            <h1>Profile</h1>
            <p>User id: {props.userId}</p>
            <p>Username: {props.username}</p>
            <form
                method="post"
                action="/api/logout"
                onSubmit={async (e) => {
                    e.preventDefault()
                    const response = await fetch('/api/logout', {
                        method: 'POST',
                        redirect: 'manual',
                    })
                    if (response.status === 0 || response.ok) {
                        router.push('/auth/login') // redirect to login page on success
                    }
                }}
            >
                <input type="submit" value="Sign out" />
            </form>
        </>
    )
}

export default Page
