import Head from 'next/head'
import React from 'react'
import Signin from '../../components/Signin/Signin'

function index() {
  return (
     <>
     <Head>
       <title>Sign In</title>
     </Head>
     <div className="px-4">

       <Signin />
     </div>
   </>
  )
}

export default index