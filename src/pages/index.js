import Head from 'next/head'
import Home from './Home'

export default function Index() {
  return (
    <>
      <Head>
        <title>Xcommerce</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
         <Home/>
      </main>
    </>
  )
}