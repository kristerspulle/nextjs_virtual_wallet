'use client'

import Link from 'next/link';
import { Button } from './components/Buttons/Buttons'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const Home = () => {
  const router = useRouter()
  const session = useSession()
  
  return (
    <>
      <Button type='button' text='Register' onClick={() => router.push('/register')}/>
      {session.status === 'authenticated' ? ('') : (<Link href={'/api/auth/signin'}>Log in</Link>)}
    </>
  );
}

export default Home;
