import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { NextRouter } from 'next/router'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import UserIcon from '@/components/svg/userIcon'
import { useRouter } from 'next/router'
import Logo from './svg/logo'
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

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface SidebarProps {
    children: React.ReactNode
    data: {
        display: string
        icon: string
    }
}

const NavOptions = () => {
    const Teams = () => {
        return (
            <li>
                <div className="text-xs font-semibold leading-6 text-blue-200">
                    Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                        <li key={team.name}>
                            <Link
                                href={team.href}
                                className={classNames(
                                    team.current
                                        ? 'bg-blue-700 text-white'
                                        : 'text-blue-200 hover:text-white hover:bg-blue-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-blue-400 bg-blue-500 text-[0.625rem] font-medium text-white">
                                    {team.initial}
                                </span>
                                <span className="truncate">{team.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        )
    }

    return (
        <nav className="flex flex-1 flex-col text-light_background">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? 'bg-light_secondary text-light_text '
                                            : '  hover:bg-light_accent hover:text-light_background',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current
                                                ? ''
                                                : 'group-hover:text-white',
                                            'h-6 w-6 shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="mt-auto">
                    <Link
                        href="/profile"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-light_background hover:bg-light_accent hover:text-light_background"
                    >
                        <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-blue-200 group-hover:text-light_background"
                            aria-hidden="true"
                        />
                        User Settings
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

const SignOut = (router: NextRouter) => {
    return (
        <>
            <Menu.Item>
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
            </Menu.Item>
        </>
    )
}

const Sidebar = () => {
    return (
        <div className="flex grow flex-col gap-y-3 overflow-y-auto bg-light_primary dark:bg-dark_primary px-6 pb-4">
            <Logo classname="h-24 mt-4 fill-light_secondary" />
            <NavOptions />
        </div>
    )
}

const Layout: React.FC<SidebarProps> = ({ children, data }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()

    return (
        <>
            <div className="flex flex-col h-screen dark">
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
                                    <Sidebar />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <Sidebar />
                </div>

                <div className="lg:pl-72 h-full flex flex-col">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200  dark:border-dark_secondary bg-light_background dark:bg-dark_background text-light_text px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-light_text dark:text-dark_text lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div
                            className="h-6 w-px bg-gray-900/10 lg:hidden"
                            aria-hidden="true"
                        />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                            {/* <form
                                className="relative flex flex-1"
                                action="#"
                                method="GET"
                            >
                                <label
                                    htmlFor="search-field"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <input
                                    id="search-field"
                                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                />
                            </form> */}
                            <div className="flex items-center gap-x-4 lg:gap-x-6 text-light_text dark:text-dark_text">
                                <button
                                    type="button"
                                    className="-m-2.5   hover:text-gray-500"
                                >
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    <BellIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Separator */}
                                <div
                                    className="hidden lg:block lg:h-6 lg:w-px bg-light_text dark:bg-dark_text "
                                    aria-hidden="true"
                                />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>

                                        <UserIcon
                                            Icon={data.icon}
                                            className="text-4xl p-[.125rem]"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                className="ml-4 text-sm font-semibold leading-6 "
                                                aria-hidden="true"
                                            >
                                                {data.display}
                                            </span>
                                            <ChevronDownIcon
                                                className="ml-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-light_background py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <SignOut {...router} />
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="py-10  flex flex-1 bg-light_background dark:bg-dark_background text-light_text">
                        <div className="px-2 sm:px-6 lg:px-8 flex-1 flex  w-full h-full justify-center items-center">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout
