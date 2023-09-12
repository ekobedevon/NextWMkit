// pages/login.tsx
import { useRouter } from 'next/router'
import { auth } from '@/auth/lucia'
import Link from 'next/link'

import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const getServerSideProps = async (
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> => {
    const authRequest = auth.handleRequest(context)
    const session = await authRequest.validate()
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}

const Page = () => {
    const router = useRouter()
    return (
        <div className="w-full flex flex-col justify-center items-center h-screen gap-2">
            <h1>Sign in</h1>
            <form
                className="flex flex-col gap-2"
                method="post"
                action="/api/login"
                onSubmit={async (e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const response = await fetch(e.currentTarget.action, {
                        method: 'POST',
                        body: JSON.stringify({
                            username: formData.get('username'),
                            password: formData.get('password'),
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        redirect: 'manual',
                    })

                    if (response.status === 0 || response.ok) {
                        router.push('/') // redirect to profile page on success
                    }
                }}
            >
                <label htmlFor="username">Username</label>
                <input
                    className="text-black border-text-black border-black border-2 rounded-lg"
                    name="username"
                    id="username"
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    className="text-text-black border-black border-2 rounded-lg"
                    type="password"
                    name="password"
                    id="password"
                />
                <br />
                <input  type="submit" />
            </form>
            <Link href="/auth/signup">Create an account</Link>
        </div>
    )
}

export default Page
