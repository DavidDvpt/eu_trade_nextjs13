'use client';

function AuthCheck({ children }: IChildren) {
  // const router = useRouter();
  // const { status } = useSession();

  // if (status === 'unauthenticated') {
  //   router.push('/login');
  // }

  return <>{children}</>;
}

export default AuthCheck;
