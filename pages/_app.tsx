import { AppProps } from 'next/app'
import Layout from '../components/layout'
import '../styles/index.css'
import '../styles/styles.scss'

import { Roboto_Condensed } from 'next/font/google'

const RobotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={RobotoCondensed.className}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
