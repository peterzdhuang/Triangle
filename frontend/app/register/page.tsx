'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Next.js routing
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Next.js router hook
  const handleRegister = async () => {
    let role = "USER";
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, username, password, role }),
    });
    const data = await response.json();
    const { access_token } = data;
   
    if (response.ok) {
      // Store the JWT in localStorage or a cookie
      localStorage.setItem('token', access_token);
    } else {
      alert('Login failed');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Register</CardTitle>
          <CardDescription className="text-gray-400">
            Create your account by filling out the details below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister}>
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Input
                id="username"
                type="text"
                placeholder="Username"
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
              Register
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-400">Already have an account?</p>
            <Link href="/login">
              <Button variant="link" className="text-white underline">
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
