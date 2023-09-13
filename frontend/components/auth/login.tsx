import { useRouter } from 'next/router'
import Link from 'next/link'
import Logo from '@/components/Logo/logo'
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
    const router = useRouter()
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                    {/* <img
                        className="mx-auto h-24 w-auto"
                        src="/Compass Logot.svg"
                        alt="Your Company"
                    /> */}
                    <Logo classname="fill-blue-700 mx-auto h-24 w-auto" />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="/api/login"
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
                        }}
                    >
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className=" pl-2 block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link
                            className="hover:text-indigo-600"
                            href="/auth/signup"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
