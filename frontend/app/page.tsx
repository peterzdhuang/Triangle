import Link from 'next/link'
export default function Home() {
  return (
    <>
      <Link href="/register">register</Link>
      <Link href="/login">login</Link>
    </>
  );
}

// Whenever they hit protected route, 