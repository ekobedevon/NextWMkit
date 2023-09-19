import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { darkModeAtom } from '@/utils/atom'
export default function App({ Component, pageProps }: AppProps) {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    if (darkMode) {
        return (
            <div className="dark">
                {' '}
                <Component {...pageProps} />{' '}
            </div>
        )
    } else {
        return (
            <div className="">
                {' '}
                <Component {...pageProps} />{' '}
            </div>
        )
    }
}

// export default function App({ Component, pageProps }: AppProps) {
//     const router = useRouter()
//     if (!router.pathname.startsWith('/auth')) {
//         return (
//             <>
//                 <Layout>
//                     <Component {...pageProps} />
//                 </Layout>
//             </>
//         )
//     } else {
//         return <Component {...pageProps} />
//     }
// }
