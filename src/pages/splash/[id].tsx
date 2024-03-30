import PageHeader from '@/components/Common/PageHeader'
import SplashDetails from '@/components/SplashManagement/SplashDetails'
import Head from 'next/head'
import React from 'react'

function index() {
  return (
     <>
     <Head>
       <title>Splash Details</title>
     </Head>
     <PageHeader title={"Splash Details"} text={""} />
     <SplashDetails />
   </>
  )
}

export default index