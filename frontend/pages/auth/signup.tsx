// pages/signup.tsx
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth } from '@/auth/lucia'
import Logo from '@/components/svg/logo'

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
        <div className="flex w-full h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                    {/* <img
                        className="mx-auto h-24 w-auto"
                        src="/Compass Logot.svg"
                        alt="Your Company"
                    /> */}
                    <Logo classname="fill-light_primary mx-auto h-24 w-auto" />
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight ">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="/api/signup"
                        method="post"
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const formData = new FormData(e.currentTarget)
                            const response = await fetch(
                                e.currentTarget.action,
                                {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        username: formData.get('username'),
                                        password: formData.get('password'),
                                        code: formData.get('code'),
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    redirect: 'manual',
                                }
                            )
                            if (response.status === 0 || response.ok) {
                                router.push('/') // redirect to profile page on success
                            }
							else
							{
								console.log(response)
							}						
                        }}
                    >
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 "
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="pl-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light_accent sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className=" block text-sm font-medium leading-6 "
                                >
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-light_accent hover:text-blue-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light_accent sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className=" block text-sm font-medium leading-6 "
                                >
                                    Invite Code
                                </label>
                                {/* <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-light_accent hover:text-blue-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="code"
                                    name="code"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light_accent sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-light_primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light_accent"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-light_text">
                        Already a member?{' '}
                        <Link
                            className="hover:underline hover:text-light_primary"
                            href="/auth/login"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page
