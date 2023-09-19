import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import UserIcon from '@/components/svg/userIcon'
import { useRouter, NextRouter } from 'next/router'
import Logo from './svg/logo'
import { GiCowled } from 'react-icons/gi'
import { useAtom } from 'jotai'
import { darkModeAtom } from '@/utils/atom'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    {
        name: 'Documents',
        href: '#',
        icon: DocumentDuplicateIcon,
        current: false,
    },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

function classNames(...classes:string[]) {
    return classes.filter(Boolean).join(' ')
}
interface SidebarProps {
    children: React.ReactNode
    data: {
        display: string
        icon: string
    }
}
const SignOut = (router: NextRouter) => {
    return (
        <>
            
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
                    <button
                        value="Sign out"
                        className=" w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                    >
                        Sign Out
                    </button>
                </form>
            
        </>
    )
}

const NavLinks = () =>{
	const [darkMode, setDarkMode] = useAtom(darkModeAtom)
	return (
        <li>
            <ul role="list" className="-mx-2 space-y-1 ">
                {navigation.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? 'text-light_accent  '
                                    : 'text-light_text  hover:text-light_accent  hover:drop-shadow-2xl',
                                darkMode ? 'text-dark_text' : '',
                                darkMode && item.current
                                    ? 'ring-dark_accent ring-2'
                                    : 'hover:text-dark_accent',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold '
                            )}
                        >
                            <item.icon
                                className={classNames(
                                    item.current
                                        ? ''
                                        : 'text-light_text dark:text-dark_text group-hover:text-light_accent dark:group-hover:text-dark_accent ',
                                    'h-6 w-6 shrink-0',
                                    darkMode ? 'text-dark_text' : '',
                                    darkMode && item.current
                                        ? 'ring-dark_accent'
                                        : 'hover:text-dark_accent'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}


const NavOptions = () => {
    return (
        <nav className="flex flex-1 flex-col text-light_text dark:text-dark_text">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <NavLinks />
                <li className="-mx-6 mt-auto">
                    <Link
                        href="/profile"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6  hover:text-light_accent dark:hover:text-dark_accent"
                    >
                        <UserIcon
                            Icon={'GICowled'}
                            className="text-4xl p-[.125rem]"
                        />
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true" className="">
                            Tom Cook
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
const DarkNavOptions = () => {
    return (
        <nav className="flex flex-1 flex-col text-dark_text">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <NavLinks />
                <li className="-mx-6 mt-auto">
                    <Link
                        href="/profile"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6  hover:text-dark_accent"
                    >
                        <UserIcon
                            Icon={'GICowled'}
                            className="text-4xl p-[.125rem]"
                        />
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true" className="">
                            Tom Cook
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}


const Sidebar: React.FC<SidebarProps> = ({ children, data }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
	const [darkMode, setDarkMode] = useAtom(darkModeAtom)
	const router = useRouter()
	const navBackground =
        'flex grow flex-col gap-y-2 overflow-y-auto px-6 pb-2' + (darkMode ? "bg-dark_background" : "bg-light_background")
    return (
        <>
            <div className="dark">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    {darkMode ? (
                                        <div
                                            className={
                                                'flex grow flex-col gap-y-2 overflow-y-auto bg-dark_background px-6 pb-2'
                                            }
                                        >
                                            <div className="flex h-16 shrink-0 items-center">
                                                <Logo classname="h-12 w-auto fill-dark_text" />
                                            </div>
                                            <nav className="flex flex-1 flex-col">
                                                <ul
                                                    role="list"
                                                    className="flex flex-1 flex-col gap-y-7"
                                                >
                                                    <NavLinks />
                                                </ul>
                                            </nav>
                                        </div>
                                    ) : (
                                        <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-light_background px-6 pb-2">
                                            <div className="flex h-16 shrink-0 items-center">
                                                <Logo classname="h-12 w-auto fill-light_text" />
                                            </div>
                                            <nav className="flex flex-1 flex-col">
                                                <ul
                                                    role="list"
                                                    className="flex flex-1 flex-col gap-y-7"
                                                >
                                                    <NavLinks />
                                                </ul>
                                            </nav>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-light_background dark:bg-dark_background px-6 drop-shadow-2xl">
                        <div className="flex h-16 shrink-0 items-center">
                            <Logo classname="h-12 w-auto fill-light_text dark:fill-dark_text" />
                        </div>
                        <NavOptions />
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-light_background dark:bg-dark_background text-light_text dark:text-dark_text px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5  lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-light_text dark:text-dark_text">
                        Dashboard
                    </div>
                    <a href="#">
                        <span className="sr-only">Your profile</span>
                        <UserIcon
                            Icon={'GICowled'}
                            className="text-4xl p-[.125rem] "
                        />
                    </a>
                </div>

                <main className="py-10 lg:pl-72 h-screen flex bg-light_background dark:bg-dark_background text-light_text dark:text-dark_text">
                    <div className="px-2 sm:px-6 lg:px-8 flex-1 flex  w-full h-full justify-center items-center">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
export default Sidebar