import '../styles/globals.css'
import type { AppProps } from 'next/app'

function NewsApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default NewsApp
