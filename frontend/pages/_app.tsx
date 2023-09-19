import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
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
