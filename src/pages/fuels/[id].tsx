import PageHeader from '@/components/Common/PageHeader'
import FuelDetails from '@/components/FuelManagement/FuelDetails'
import Head from 'next/head'
import React from 'react'

function index() {
  return (
     <>
     <Head>
       <title>Fuel Details</title>
     </Head>
     <PageHeader title={"Fuel Details"} text={""} />
     <FuelDetails />
   </>
  )
}

export default index