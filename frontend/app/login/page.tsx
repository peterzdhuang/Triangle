'use client'
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.text();
    console.log(data, response);
    if (response.ok) {
      // Store the JWT in localStorage or a cookie
      localStorage.setItem('token', data);
    } else {
      alert('Login failed');
    }
  };
  const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await fetch('http://localhost:8080/demo', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log('Unauthorized or expired token');
    }
  };
  

  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
      
      <button onClick={fetchProtectedData}>Check</button>
    </div>
  );
}

export default Login;
