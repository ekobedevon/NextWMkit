import { useState, Fragment } from 'react'
import { RadioGroup } from '@headlessui/react'
import { SetStateAction, Dispatch } from 'react'
import UserIcon from '@/components/svg/userIcon'
import { Menu, Listbox, Dialog, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import { darkModeAtom } from '@/utils/atom'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export interface radioDetails {
    options: string[]
    initial: string
    stateSetter: Dispatch<SetStateAction<string>>
    srText: string
}

export default function SVGModalRadio({
    options,
    initial,
    stateSetter,
    srText,
}: radioDetails) {
    const [isOpen, setIsOpen] = useState(false)
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const modalStyle =
        'w-fit transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all' +
        (darkMode ? ' bg-dark_background' : ' bg-light_background ')
    const buttonStyle =
        'bg-dark_text text-dark_background focus-visible:ring-dark_accent inline-flex justify-center rounded-md border border-transparent   px-4 py-2 text-sm font-medium hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-light_accent focus-visible:ring-offset-2' +
        (darkMode
            ? 'bg-white text-light_background focus-visible:ring-light_accent'
            : 'bg-dark_text text-dark_background focus-visible:ring-dark_accent')
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    return (
        <>
            <div className="inset-0 flex items-center justify-center ">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md sm:px-3 sm:py-3 text-sm font-medium border-2 hover:ring-4 ring-offset-4 border-light_accent dark:border-dark_accent active:bg-light_accent dark:active:bg-dark_accent active:bg-opacity-30  focus:outline-none focus-visible:ring-2 focus-visible:ring-light_text dark:focus-visible:ring-dark_text focus-visible:ring-opacity-75"
                >
                    <UserIcon Icon={initial} className="w-auto text-9xl " />
                    <span className="sr-only">{srText}</span>
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto ">
                        <div className="flex min-h-full items-center justify-center p-4 text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                {/* w-fit transform overflow-hidden rounded-2xl
                                bg-light_background dark:bg-dark_background p-6
                                text-left align-middle shadow-xl transition-all */}
                                <Dialog.Panel className={modalStyle}>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-light_text"
                                    >
                                        Select Icon
                                    </Dialog.Title>
                                    <div className="">
                                        <RadioGroup
                                            value={initial}
                                            onChange={stateSetter}
                                            className="mt-2"
                                        >
                                            <RadioGroup.Label className="sr-only">
                                                Choose a user icon
                                            </RadioGroup.Label>
                                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                                                {options.map(
                                                    (option, index) => (
                                                        <RadioGroup.Option
                                                            key={index}
                                                            value={option}
                                                            className={({
                                                                active,
                                                                checked,
                                                            }) =>
                                                                classNames(
                                                                    'sm:text-6xl text-5xl cursor-pointer focus:outline-none hover:ring-2 hover:ring-light_primary hover:ring-offset-2 ',
                                                                    darkMode
                                                                        ? 'bg-light_text text-light_background' // Dark mode handles default text/background
                                                                        : 'bg-dark_text  text-dark_background', // Ligh mode handles default text/background
                                                                    checked
                                                                        ? ' hover:ring-light_text bg-light_text text-light_background' // here to set light mode checked item
                                                                        : 'ring-1 ring-inset ring-light_primary bg-light_background ', // here to set light mode unchecked item
                                                                    darkMode &&
                                                                        checked
                                                                        ? 'bg-dark_accent  text-dark_background ring-light_text border-2 border-dark_text' // here to set dark mode checked item
                                                                        : 'ring-1 ring-inset  ', // here to set dark mode unchecked item
                                                                    'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 '
                                                                )
                                                            }
                                                        >
                                                            <RadioGroup.Label as="span">
                                                                <span className="sr-only">
                                                                    icon:{' '}
                                                                    {option}
                                                                </span>
                                                                <UserIcon
                                                                    Icon={
                                                                        option
                                                                    }
                                                                    className=" w-auto sm:h-16 h-12 dark:text-green-500"
                                                                />
                                                            </RadioGroup.Label>
                                                        </RadioGroup.Option>
                                                    )
                                                )}
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="mt-4">
                                        {darkMode ? (
                                            <button
                                                type="button"
                                                className="bg-dark_text text-dark_background focus-visible:ring-dark_accent inline-flex justify-center rounded-md border border-transparent   px-4 py-2 text-sm font-medium hover:bg-opacity-80 focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Confirm
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="bg-light_text text-light_background focus-visible:ring-light_accent inline-flex justify-center rounded-md border border-transparent   px-4 py-2 text-sm font-medium hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Confirm
                                            </button>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

// ;<div>
//     <div className="flex items-center justify-between">
//         <h2 className="text-sm font-bold leading-6 text-gray-900 ">
//             Select user icon
//         </h2>
//     </div>

// <RadioGroup value={initial} onChange={stateSetter} className="mt-2">
//     <RadioGroup.Label className="sr-only">
//         Choose a user icon
//     </RadioGroup.Label>
//     <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
//         {options.map((option, index) => (
//             <RadioGroup.Option
//                 key={index}
//                 value={option}
//                 className={({ active, checked }) =>
//                     classNames(
//                         'cursor-pointer focus:outline-none hover:ring-2 hover:ring-blue-600 hover:ring-offset-2',

//                         checked
//                             ? 'bg-blue-600 text-white hover:bg-blue-500'
//                             : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
//                         'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
//                     )
//                 }
//             >
//                 <RadioGroup.Label as="span">
//                     <span className="sr-only">icon: {option}</span>
//                     <UserIcon
//                         Icon={option}
//                         className="w-auto lg:h-16 h-8"
//                     />
//                 </RadioGroup.Label>
//             </RadioGroup.Option>
//         ))}
//     </div>
// </RadioGroup>
// </div>

// <Listbox value={initial} onChange={stateSetter}>
//             <Listbox.Button>
//                 <div className="flex py-4 items-center gap-2">
//                     <UserIcon Icon={initial} className="w-auto lg:h-16 h-8" />
//                     <p className="text-base font-semibold leading-7 text-gray-900">
//                         {buttonText}
//                     </p>
//                 </div>
//             </Listbox.Button>
//             <Listbox.Options>
//                 <div className="grid grid-cols-3 gap-3 sm:grid-cols-9">
//                     {options.map((option, index) => (
//                         <Listbox.Option
//                             key={index}
//                             value={option}
//                             className={({ active }) =>
//                                 classNames(
//                                     'cursor-pointer focus:outline-none hover:ring-2 hover:ring-blue-600 hover:ring-offset-2',
//                                     'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
//                                 )
//                             }
//                         >
//                             <span className="sr-only">icon: {option}</span>
//                             <UserIcon
//                                 Icon={option}
//                                 className="w-auto lg:h-16 h-8"
//                             />
//                         </Listbox.Option>
//                     ))}
//                 </div>
//             </Listbox.Options>
//         </Listbox>
