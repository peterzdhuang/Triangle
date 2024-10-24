'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Next.js routing
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CountryDropdown from '@/components/component/country-dropdown';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState(''); // State for Province/State dropdown
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState(''); // State for Country dropdown
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    let role = "USER";
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
        restaurantName,
        restaurantAddress,
        city,
        province,
        postalCode,
        country,
        role
      }),
    });
    const data = await response.json();
    const { access_token } = data;

    if (response.ok) {
      // Store the JWT in localStorage or a cookie
      localStorage.setItem('token', access_token);
    } else {
      alert('Registration failed');
    }
  };
  const handleCountrySelect = (country: string) => {
    console.log("Selected country:", country);
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

            <div className="space-y-2">
              <Input
                id="restaurantName"
                type="text"
                placeholder="Restaurant Name"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="restaurantAddress"
                type="text"
                placeholder="Restaurant Address"
                required
                value={restaurantAddress}
                onChange={(e) => setRestaurantAddress(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="city"
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            
            <div className="relative w-[180px]">
              <select defaultValue={'Select a province'} className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-gray-500">
                <option disabled>Select a province</option>

                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NF">Newfoundland</option>
                <option value="NT">Northwest Territories</option>
                <option value="NS">Nova Scotia</option>
                <option value="NU">Nunavut</option>
                <option value="ON">Ontario</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="YT">Yukon Territory</option>

              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.292 7.707a1 1 0 011.415 0L10 11l3.293-3.293a1 1 0 011.415 1.415l-4 4a1 1 0 01-1.415 0l-4-4a1 1 0 010-1.415z"/>
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <Input
                id="postalCode"
                type="text"
                placeholder="Postal Code"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="space-y-2 z-50">
              <CountryDropdown onSelect={handleCountrySelect}/>
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
