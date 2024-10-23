'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // No token found, redirect to login
        router.push('/login');
        return;
      }
      try {
        // Call the Spring Boot backend to validate the token
        const response = await fetch('http://localhost:8080/demo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        // Token is valid, continue to the protected page
        console.log('Token is valid!');
      } catch (error) {
        console.error('Authentication failed:', error);
        // Redirect to login if the token is invalid
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>This page is protected and requires authentication.</p>
    </div>
  );
}
