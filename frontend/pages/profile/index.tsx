// pages/index.tsx

import redirectToLogin, { authCtx } from '@/utils/redirectToLogin'

import type {
    GetServerSidePropsResult,
    InferGetServerSidePropsType,
} from 'next'
import { useEffect, useReducer, useState } from 'react'
import Layout from '@/components/Layout'
import Radio from '@/components/radio'
import UserIcon from '@/components/svg/userIcon'
import { useRouter } from 'next/router'

export const getServerSideProps = async (
    ctx: authCtx
): Promise<
    GetServerSidePropsResult<{
        username: string
        icon: string
    }>
> =>
    redirectToLogin(ctx, async (ctx) => {
        return {
            props: {
                username: ctx.username,
                icon: ctx.icon,
            },
        }
    })

interface newCredentials {
    userName: string
    password: string
    confirm: string
}

const iconList: string[] = [
    'barbarian.svg',
    'barbute.svg',
    'brutal-helm.svg',
    'cowled.svg',
    'crowned-skull.svg',
    'cultist.svg',
    'diablo-skull.svg',
    'dracula.svg',
    'dragon-head.svg',
    'dwarf-face.svg',
    'dwarf-helmet.svg',
    'dwarf-king.svg',
    'elf-helmet.svg',
    'executioner.svg',
    'femaleElf.svg',
    'fish-monster.svg',
    'goblin.svg',
    'golem.svg',
    'kenku.svg',
    'monk-face.svg',
    'nun-face.svg',
    'ogre.svg',
    'orc-head.svg',
    'overlord-helm.svg',
    'troll.svg',
    'vampire.svg',
    'visoredhelm.svg',
    'warlock.svg',
    'witch.svg',
    'wizard.svg',
]

interface Action {
    type: string // The type property is typically a string or a constant.
    value: string // You can specify additional properties as needed.
}

const counterReducer = (state: { text: number }, action: Action) => {
    switch (action.type) {
        case 'update':

        case 'decrement':

        case 'reset':
            return { count: 0 }
        default:
            return state
    }
}

const Page = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const [time, setTime] = useState<Date>()
    const router = useRouter()
    const [newName, setNewName] = useState<string>('')
    const [newPass, setNewPass] = useState<string>('')
    const [conPass, setConPass] = useState<string>('')
    const [passMatch, setPassMatch] = useState<boolean | undefined>()
    const [icon, setIcon] = useState<string>(props.icon)
    const testCall = async () => {
        const newDate = new Date()
        console.log(newDate.toDateString)
        setTime(newDate)
    }
    console.log(props)

    useEffect(() => {
        // Check if both newPass and conPass are defined and not empty
        if (
            newPass !== undefined &&
            conPass !== undefined &&
            newPass !== '' &&
            conPass !== ''
        ) {
            // Compare newPass and conPass
            if (newPass === conPass) {
                setPassMatch(true) // Passwords match
            } else {
                setPassMatch(false) // Passwords don't match
            }
        } else {
            setPassMatch(undefined) // Either newPass or conPass is undefined or empty
        }
    }, [newPass, conPass])

    return (
        <Layout data={props}>
            <form
                className="px-6 pt-8 pb-4 flex flex-col gap-8 border-2 rounded-md drop-shadow-lg"
                // action="/api/update" come back to later
                method="post"
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
                        router.reload() // redirect to profile page on success
                    }
                }}
            >
                <div className="flex sm:flex-row flex-col items-center sm:gap-12 gap-4 sm:pl-2">
                    <div className="flex items-center">
                        <div className="">
                            <Radio
                                stateSetter={setIcon}
                                options={iconList}
                                initial={icon}
                                srText="Change Icon"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-6">
                        <div className=" pb-2">
                            <label
                                htmlFor="username"
                                className="text-base font-semibold leading-7 text-gray-900"
                            >
                                Update Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    onChange={(e) => setNewName(e.target.value)}
                                    type="text"
                                    autoComplete="false"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="password"
                                className="text-base font-semibold leading-7 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setNewPass(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="false"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            {passMatch === true && (
                                <label
                                    htmlFor="password"
                                    className="text-base font-semibold leading-7 text-green-500"
                                >
                                    Passwords Match!!
                                </label>
                            )}

                            {passMatch === false && (
                                <label
                                    htmlFor="password"
                                    className="text-base font-semibold leading-7 text-yellow-500"
                                >
                                    Passwords do not match
                                </label>
                            )}

                            {passMatch === undefined ||
                            (newPass === '' && conPass === '') ? (
                                <label
                                    htmlFor="password"
                                    className="text-base font-semibold leading-7 text-gray-900"
                                >
                                    Confirm Password
                                </label>
                            ) : null}
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setConPass(e.target.value)}
                                    id="confPass"
                                    name="password"
                                    type="password"
                                    autoComplete="false"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center items-center">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Submit Changes
                    </button>
                </div>
            </form>
        </Layout>
    )
}

export default Page
