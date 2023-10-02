// pages/index.tsx

import redirectToLogin, { authCtx } from '@/utils/redirectToLogin'

import type {
    GetServerSidePropsResult,
    InferGetServerSidePropsType,
} from 'next'
import { useEffect, useReducer, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { LightSVGModalRadio,DarkSVGModalRadio } from '@/components/IconRadio'
import UserIcon from '@/components/svg/userIcon'
import { useRouter } from 'next/router'
import { darkModeAtom } from '@/utils/atom'
import { useAtom } from 'jotai'
import NightSwitch from '@/components/NightSwitch'

export const getServerSideProps = async (
    ctx: authCtx
): Promise<
    GetServerSidePropsResult<{
        display: string
        icon: string
        role: string
    }>
> =>
    redirectToLogin(ctx, async (ctx) => {
        return {
            props: {
                display: ctx.display,
                icon: ctx.icon,
				role: ctx.role
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



const Page = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const router = useRouter()
    const [newPass, setNewPass] = useState<string>('')
    const [confPass, setConPass] = useState<string>('')
    const [passMatch, setPassMatch] = useState<boolean | undefined>()
    const [icon, setIcon] = useState<string>(props.icon)
	const [darkMode,setDarkMode] = useAtom(darkModeAtom)
	useEffect(()=>{
		console.log(icon)
	},[icon])

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
    return (
        <Sidebar props={props}>
            <form
                className="px-6 pt-8 pb-4 flex flex-col gap-8 border-2 border-light_primary dark:border-dark_primary rounded-md drop-shadow-lg"
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
                            icon: icon,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        redirect: 'manual',
                    })

                    if (response.status === 0 || response.ok) {
                        console.log('GUCCI')
                        router.reload() // redirect to profile page on success
                    }
                }}
            >
                <div className="flex sm:flex-row flex-col items-center sm:gap-12 gap-4 sm:pl-2 text-light_text dark:text-dark_text">
                    <div className="flex items-center flex-col gap-3">
						<p className='text-xl font-bold'>Change Icon</p>
                        <div className="">
                            {darkMode ? (
                                <DarkSVGModalRadio
                                    stateSetter={setIcon}
                                    options={iconList}
                                    initial={icon}
                                    srText="Change Icon"
                                />
                            ) : (
                                <LightSVGModalRadio
                                    stateSetter={setIcon}
                                    options={iconList}
                                    initial={icon}
                                    srText="Change Icon"
                                />
                            )}
                        </div>
                        <div className="flex flex-col items-center  ">
                            <p className="font-bold text-3xl">
                                {props.display}
                            </p>
                            <p className="text-xl">{props.role}</p>
                            <div className="my-4">
                                <NightSwitch />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-6 ">
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
                                    className=" pl-2 block w-full bg-background rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-light_accent dark:focus:ring-dark_accent sm:text-sm sm:leading-6"
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
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-light_accent dark:focus:ring-dark_accent sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex-1 ">
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
                                    className="text-light_text dark:text-dark_background pl-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-light_accent dark:focus:ring-dark_accent sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className=" flex justify-end items-center">
                            <button
                                type="submit"
                                className="rounded-md bg-light_text text-light_background dark:bg-dark_text dark:text-dark_background  px-3 py-2 text-sm font-semibold shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light_accent"
                            >
                                Submit Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Sidebar>
    )
}

export default Page
