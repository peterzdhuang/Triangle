'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Next.js routing
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CountryDropdown from '@/components/component/country-dropdown';
import { AlertDestructive } from '@/components/component/alert';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    let role = "ADMIN";
    console.log(JSON.stringify({
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
    }));
    if (!firstName || !lastName || !username || !password || !restaurantName || !restaurantAddress || !city || !province || !postalCode || !country) {
      setError("All fields are required");
      return;
    }

    try {
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

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Registration failed: ${errorData.message || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      const { access_token } = data;

      if (access_token) {
        localStorage.setItem('token', access_token);
        alert('Registration successful!');
      } else {
        setError('Registration failed: Missing token');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed: Server error');
    }
  }

  const handleCountrySelect = (country) => {
    setCountry(country);
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
            {error && <AlertDestructive message={error} />}
            
            {/* Form Fields */}
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              id="restaurantName"
              type="text"
              placeholder="Restaurant Name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
            <Input
              id="restaurantAddress"
              type="text"
              placeholder="Restaurant Address"
              value={restaurantAddress}
              onChange={(e) => setRestaurantAddress(e.target.value)}
            />
            <Input
              id="city"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            {/* Province Select */}
            <div className="relative w-[180px]">
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-gray-500"
              >
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
            </div>

            <Input
              id="postalCode"
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />

            <CountryDropdown onSelect={handleCountrySelect} />
            
            <Button type="submit" className="w-full">Register</Button>
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
