import EnumForm from '@/components/EnumManagement/EnumForm'
import Head from 'next/head'
import React from 'react'

function index() {
  return (
     <>
      <Head>
        <title>Enum Form</title>
      </Head>
      <EnumForm />
    </>
  )
}

export default index