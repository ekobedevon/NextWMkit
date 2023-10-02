import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { useAtom } from 'jotai'
import { darkModeAtom } from '@/utils/atom'
import { GiConsoleController } from 'react-icons/gi'
import {
    SunIcon,MoonIcon
} from '@heroicons/react/24/outline'

function classNames(...classes:string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NightSwitch() {
    const [enabled, setEnabled] = useState(false)
	const [darkMode,setDarkMode] = useAtom(darkModeAtom)
    return (
        <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={classNames(
                darkMode
                    ? 'bg-dark_text ring-dark_text ring-offset-dark_background '
                    : 'bg-light_text ring-light_text ring-offset-light_background',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2  border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-2  ring-offset-2 '
            )}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={classNames(
                    darkMode
                        ? 'translate-x-5 bg-dark_background'
                        : 'translate-x-0 bg-white',
                    'pointer-events-none flex  h-5 w-5 transform rounded-full  shadow  transition duration-200 ease-in-out justify-center items-center'
                )}
            >
                {darkMode ? <MoonIcon className=" " /> : <SunIcon />}
            </span>
        </Switch>
    )
}
