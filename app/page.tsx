'use client'

import Link from 'next/link';
import { Button } from './components/Buttons/Buttons'
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter()
  return (
    <>
      <Button type='button' text='Register' onClick={() => router.push('/register')}/>
      <Link href={'/api/auth/signin'}>Log in</Link>
    </>
  );
}

export default Home;
