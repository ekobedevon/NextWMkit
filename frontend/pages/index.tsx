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

	const testCall = async () => {
		const response = await fetch('http://localhost:8080/',{
			credentials: "include"
		})
		const data =  await response.json();
		console.log(data)
	}

    const router = useRouter()
    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 ">
                    <h1 className="font-bold text-">Profile</h1>
                    <p>
                        <span className="font-bold">User id: </span>{' '}
                        {props.userId}
                    </p>
                    <p>
                        <span className="font-bold">Username: </span>
                        {props.username}
                    </p>
                </div>

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
				<button className='w-fit p-2 border-2 border-black rounded-lg active:bg-black active:text-white' onClick={testCall}>CLICK ME</button>
            </div>

        </>
    )
}

export default Page
