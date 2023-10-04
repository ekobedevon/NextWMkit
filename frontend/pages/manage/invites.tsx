// pages/index.tsx
import { useRouter } from 'next/router'
import redirectToLogin, { authCtx } from '@/utils/redirectToLogin'

import type {
    GetServerSidePropsResult,
    InferGetServerSidePropsType,
} from 'next'
import ky from 'ky'
import {
    Fragment,
    useRef,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
} from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import Sidebar from '@/components/Sidebar'

type invite = {
    id: string
    authorId: string
    expiration?: string | undefined // Use optional property with '?'
    uses: number
    max_uses: number
}

export const getServerSideProps = async (
    ctx: authCtx
): Promise<
    GetServerSidePropsResult<{
        data: { display: string; icon: string; role: string }
        invites: invite[]
    }>
> =>
    redirectToLogin(ctx, async (ctx) => {
        try {
            // const url = `${process.env.HTTPS === '1' ? 'https' : 'http'}://${
            //     process.env.API_URL
            // }/invite/all`
            // console.log(url)
            // const response = await fetch(url, {
            //     credentials: 'include',
            // })
            let inviteData: invite[] = []
            // if (response.ok) {
            //     inviteData = await response.json()
            //     console.log(inviteData)
            // } else {
            //     console.error(
            //         'Error fetching data:',
            //         response.status,
            //         response.statusText
            //     )
            // }
            return {
                props: {
                    data: {
                        display: ctx.display,
                        icon: ctx.icon,
                        role: ctx.role,
                    },
                    invites: inviteData, // Use the extracted JSON data
                },
            }
        } catch (error) {
            // Handle errors appropriately, e.g., log or return an error page
            console.error('Error in getServerSideProps:', error)

            return {
                redirect: {
                    destination: '/error', // Redirect to an error page
                    permanent: false,
                },
            }
        }
    })

const NewInviteModal = ({
    setOpen,
    open,
}: {
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}) => {
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon
                                            className="h-6 w-6 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-light_text dark:text-dark_text"
                                        >
                                            Deactivate account
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to
                                                deactivate your account? All of
                                                your data will be permanently
                                                removed from our servers
                                                forever. This action cannot be
                                                undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-light_primary px-3 py-2 text-sm font-semibold text-light_background shadow-sm  sm:ml-3 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                    >
                                        Create Invite
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-light_background px-3 py-2 text-sm font-semibold text-light_text dark:text-dark_text shadow-sm sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

const Table = ({
    invites,
    deleteInviteByID,
}: {
    invites: invite[]
    deleteInviteByID: any
}) => {
    const [open, setOpen] = useState(true)
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-light_text dark:text-dark_text">
                        Invites
                    </h1>
                    <p className="mt-2 text-sm text-light_text dark:text-dark_text">
                        A list of all invites currently active on the server
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-light_primary dark:bg-dark_primary px-3 py-2 text-center text-sm font-semibold text-light_background  dark:text-dark_background shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setOpen(!open)}
                    >
                        Create Invite
                    </button>
                    <NewInviteModal open={open} setOpen={setOpen} />
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-light_accent dark:divide-dark_accent">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-light_text dark:text-dark_text sm:pl-0"
                                    >
                                        ID
                                    </th>
                                    {/* <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-light_text dark:text-dark_text"
                                    >
                                        Expiration
                                    </th> */}
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-light_text dark:text-dark_text"
                                    >
                                        Uses
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-light_text dark:text-dark_text"
                                    >
                                        Max Uses
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-light_text dark:text-dark_text"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-light_text/70 dark:text-dark_text/70">
                                {invites.map((invite) => (
                                    <tr key={invite.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-light_text dark:text-dark_text font-bold sm:pl-0">
                                            {invite.id}
                                        </td>
                                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                            {invite.expiration}
                                        </td> */}
                                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                            {invite.uses}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                            {invite.max_uses}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3  text-left text-sm font-medium sm:pr-0 flex gap-x-8">
                                            <button
                                                onClick={() =>
                                                    deleteInviteByID(invite.id)
                                                }
                                                className="block rounded-md bg-light_primary dark:bg-dark_primary px-3 py-2 text-center text-sm font-semibold text-light_background  dark:text-dark_background shadow-sm "
                                            >
                                                Copy(Delete)
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteInviteByID(invite.id)
                                                }
                                                className="block rounded-md bg-light_secondary dark:bg-dark_secondary px-3 py-2 text-center text-sm font-semibold text-light_text dark:text-dark_text shadow-sm  "
                                            >
                                                Copy(Delete)
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Page = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const [invites, setInvites] = useState<invite[]>([])

    useEffect(() => {
        const getInvites = async () => {
            const url = `${process.env.HTTPS === '1' ? 'https' : 'http'}://${
                process.env.API_URL
            }/invite/all`
            //console.log(url)
            const response = await fetch(url, {
                credentials: 'include',
            })

            if (response.ok) {
                const inviteData = await response.json()
                console.log(JSON.stringify(inviteData))
                setInvites(inviteData)
            } else {
                console.error(
                    'Error fetching data:',
                    response.status,
                    response.statusText
                )
            }
        }
        getInvites()
    }, [])

    async function deleteInviteByID(id: string): Promise<void> {
        try {
            const url = `${process.env.HTTPS === '1' ? 'https' : 'http'}://${
                process.env.API_URL
            }/invite/delete?ID=${id}`
            console.log(url)

            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
            })

            if (response.ok) {
                // Reload the page on a successful DELETE request
                window.location.reload()
            } else {
                console.error(
                    'Failed to delete invite:',
                    response.status,
                    response.statusText
                )
                // Handle the error as needed
            }
        } catch (error) {
            console.error('Error while deleting invite:', error)
            // Handle the error as needed
        }
    }

    return (
        <Sidebar props={props.data}>
            <div className=" flex-1 h-screen py-8">
                <Table invites={invites} deleteInviteByID={deleteInviteByID} />
            </div>
        </Sidebar>
    )
}

export default Page
