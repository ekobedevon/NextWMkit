// pages/index.tsx

import redirectToLogin, { authCtx } from '@/utils/redirectToLogin'

import type {
    GetServerSidePropsResult,
    InferGetServerSidePropsType,
} from 'next'
import { useEffect, useReducer, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Radio from '@/components/radio'
import UserIcon from '@/components/svg/userIcon'
import { useRouter } from 'next/router'

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

interface newCredentials {
    display: string
    password: string
    confirm: string
}

const iconList: string[] = [
    'GiBarbarian',
    'GiBarbute',
    'GiBrutalHelm',
    'GiCowled',
    'GiCultist',
    'GiDiabloSkull',
    'GiVampireDracula',
    'Gi3DGlasses',
    'GiDragonHead',
    'GiDwarfFace',
    'GiDwarfHelmet',
    'GiDwarfKing',
    'GiElfHelmet',
    'GiExecutionerHood',
    'GiWomanElfFace',
    'GiFishMonster',
    'GiGoblinHead',
    'GiGolemHead',
    'GiKenkuHead',
    'GiMonkFace',
    'GiNunFace',
    'GiOgre',
    'GiOrcHead',
    'GiOverlordHelm',
    'GiTroll',
    'GiRestingVampire',
    'GiVisoredHelm',
    'GiWarlockHood',
    'GiWizardFace',
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
    const [newPass, setNewPass] = useState<string>('')
    const [confPass, setConPass] = useState<string>('')
    const [passMatch, setPassMatch] = useState<boolean | undefined>()
    const [icon, setIcon] = useState<string>(props.icon)
    const testCall = async () => {
        const newDate = new Date()
        console.log(newDate.toDateString)
        setTime(newDate)
    }

    useEffect(() => {
        // Check if both newPass and conPass are defined and not empty
        if (
            newPass !== undefined &&
            confPass !== undefined &&
            newPass !== '' &&
            confPass !== ''
        ) {
            // Compare newPass and conPass
            if (newPass === confPass) {
                setPassMatch(true) // Passwords match
            } else {
                setPassMatch(false) // Passwords don't match
            }
        } else {
            setPassMatch(undefined) // Either newPass or conPass is undefined or empty
        }
    }, [newPass, confPass])
	console.log(props)
    return (
        <Sidebar data={props}>
            <form
                className="px-6 pt-8 pb-4 flex flex-col gap-8 border-2 rounded-md drop-shadow-lg"
                action="/api/update" // come back to later
                method="post"
                onSubmit={async (e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const response = await fetch(e.currentTarget.action, {
                        method: 'POST',
                        body: JSON.stringify({
                            display: formData.get('display') || undefined,
                            password: newPass,
                            confPass: confPass,
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
                <div className="flex sm:flex-row flex-col items-center sm:gap-12 gap-4 sm:pl-2 text-light_text dark:text-dark_text">
                    <div className="flex items-center flex-col gap-6">
                        <div className="">
                            <Radio
                                stateSetter={setIcon}
                                options={iconList}
                                initial={icon}
                                srText="Change Icon"
                            />
                        </div>
                        <div className="flex flex-col items-center  ">
                            <p className="font-bold text-3xl">
                                {props.display}
                            </p>
                            <p className="text-xl">{'Placeholder'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-6">
                        <div className="">
                            <label
                                htmlFor="display"
                                className="text-base font-semibold leading-7 "
                            >
                                Update Display Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="display"
                                    name="display"
                                    type="text"
                                    autoComplete="false"
                                    className="pl-2 block w-full bg-background rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-light_accent sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="password"
                                className="text-base font-semibold leading-7 "
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
                                    className="pl-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-light_accent sm:text-sm sm:leading-6"
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
                            (newPass === '' && confPass === '') ? (
                                <label
                                    htmlFor="password"
                                    className="text-base font-semibold leading-7 "
                                >
                                    Confirm Password
                                </label>
                            ) : null}
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setConPass(e.target.value)}
                                    id="confPass"
                                    name="confPass"
                                    type="password"
                                    autoComplete="false"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-light_accent sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center items-center">
                    <button
                        type="submit"
                        className="rounded-md bg-light_primary px-3 py-2 text-sm font-semibold text-light_background shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light_accent"
                    >
                        Submit Changes
                    </button>
                </div>
            </form>
        </Sidebar>
    )
}

export default Page
