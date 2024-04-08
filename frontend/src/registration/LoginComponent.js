import React, {useEffect, useState} from 'react';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInEmail, setLoggedInEmail] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUserData(storedToken);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('http://localhost:8000/api/user/me/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setLoggedInEmail(userData.email);
            } else {
                console.error('Error fetching user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                fetchUserData(data.token);
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleLogout = () => {
        setLoggedInEmail('');
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <div>
            {token ? (
                <div>
                    <h3>Email: {loggedInEmail}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h3>Login</h3>
                    <input type="email" placeholder="Email" value={email}
                           onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" value={password}
                           onChange={e => setPassword(e.target.value)} required/>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};

export default LoginComponent;
