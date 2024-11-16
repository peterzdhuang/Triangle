'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link'; // Next.js routing
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      setError(`Login failed: ${errorData.message || 'Unknown error'}`);
      return;
    }

    
      const { access_token, message } = data; // Assuming access_token is in the response

      if (access_token) {
        localStorage.setItem('token', access_token);
        setError(""); 
        if (message) {
          redirect(message);
        }
      } else {
        setError('Login failed: Missing token');
      }
      

  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Login</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && <div className="text-red-500">{error}</div>}
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-400">Don't have an account?</p>
            <Link href="/register">
              <Button variant="link" className="text-white underline">
                Sign up
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
