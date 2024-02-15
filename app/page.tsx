'use client';

import Link from 'next/link';
import { Button } from './components/Button/Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home = () => {
  const router = useRouter();
  const session = useSession();

  return (
    <>
      {session.status === 'authenticated' ? (
        ''
      ) : (
        <div>
          <Button
          type="button"
          text="Register"
          onClick={() => router.push('/register')}
        />
          <Link href={'/api/auth/signin'}>Log in</Link>
        </div>
      )}
    </>
  );
};

export default Home;
