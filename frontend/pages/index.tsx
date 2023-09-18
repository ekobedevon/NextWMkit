// pages/index.tsx
import { useRouter } from 'next/router'
import redirectToLogin,{authCtx} from '@/utils/redirectToLogin'

import type {
    GetServerSidePropsResult,
    InferGetServerSidePropsType,
} from 'next'
import { useState } from 'react'
import Layout from '../components/Layout'

export const getServerSideProps = async (
    ctx: authCtx
): Promise<
    GetServerSidePropsResult<{
        display: string
        icon: string
    }>
> =>
    redirectToLogin(ctx, async (ctx) => {
        return {
            props: {
                display: ctx.display,
                icon: ctx.icon,
            },
        }
    })

const Page = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const [time, setTime] = useState<Date>()

    const testCall = async () => {
        const newDate = new Date()
        console.log(newDate.toDateString)
        setTime(newDate)
    }

    const router = useRouter()
    return (
        <Layout data={props}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 ">
                    <h1 className="font-bold text-">Profile</h1>
                    <p>
                        <span className="font-bold">User icon: </span>{' '}
                        {props.icon}
                    </p>
                    <p>
                        <span className="font-bold">display: </span>
                        {props.display}
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
                <button
                    className="w-fit p-2 border-2 border-black rounded-lg active:bg-black active:text-white"
                    onClick={testCall}
                >
                    CLICK ME
                </button>
                <p>{time?.toLocaleTimeString() || 'Click'}</p>
            </div>
        </Layout>
    )
}

export default Page
