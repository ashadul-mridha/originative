import BoatForm from '@/components/BoatManagement/BoatForm'
import Head from 'next/head'
import React from 'react'

function index() {
  return (
     <>
     <Head>
       <title>Boat Form</title>
     </Head>
     <BoatForm />
   </>
  )
}

export default index