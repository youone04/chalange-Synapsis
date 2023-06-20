'use client'
import Link from 'next/link';
import { Button } from 'react-bootstrap'

export default async function Home() {

  return (
    <div className='container-div'>
     <Link href={'/user'}><Button variant='dark'>Go to App</Button></Link>
    </div>
  )
}
