'use client'
import { useState } from 'react';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <div>
      <input 
        type="text" 
        placeholder="First Name" 
        value={firstName} 
        style={{ backgroundColor: 'black', color: 'white' }}
        onChange={(e) => setFirstName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Last Name" 
        value={lastName} 
        style={{ backgroundColor: 'black', color: 'white' }}
        onChange={(e) => setLastName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        style={{ backgroundColor: 'black', color: 'white' }}
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        style={{ backgroundColor: 'black', color: 'white' }}
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
