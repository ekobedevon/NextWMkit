// pages/index.tsx
import { auth } from '@/auth/lucia'
import { useRouter } from 'next/router'
import redirectToLogin,{authCtx} from '@/utils/redirectToLogin'
import UserIcon from '@/components/svg/userIcon'


import type {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    InferGetServerSidePropsType,
} from 'next'
import { useState } from 'react'
import Layout from '@/components/Layout'

export const getServerSideProps = async (
    ctx: authCtx
): Promise<
    GetServerSidePropsResult<{
        username: string
        icon: string
    }>
> =>
    redirectToLogin(ctx, async (ctx) => {
        // const authRequest = auth.handleRequest(ctx)
        // const session = await authRequest.validate()
        return {
            props: {
                username: ctx.username,
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
	console.log(props)

    
    return (
        <Layout data={props}>
            <div className="flex border-2 w-full h-full border-black">
                {props.username}
                <UserIcon Icon={props.icon} />
            </div>
        </Layout>
    )
}

export default Page
