import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { useAtom } from 'jotai'
import { darkModeAtom } from '@/utils/atom'
import { GiConsoleController } from 'react-icons/gi'

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
                darkMode ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={classNames(
                    darkMode ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
    )
}
