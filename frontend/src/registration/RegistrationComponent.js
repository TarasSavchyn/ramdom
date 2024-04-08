import React, {useEffect, useState} from 'react';

const RegistrationComponent = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleRegistration = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            if (response.ok) {
                // Реєстрація пройшла успішно, тепер робимо запит на вхід
                const loginResponse = await fetch('http://localhost:8080/api/user/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email, password})
                });
                const loginData = await loginResponse.json();
                if (loginResponse.ok) {
                    setToken(loginData.token);
                    localStorage.setItem('token', loginData.token);
                    onLogin(loginData.token);
                } else {
                    setError('Automatic login failed');
                }
            } else {
                setError('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <div>
            {!token ? (
                <div>
                    <h3>Registration</h3>
                    <input type="email" placeholder="Email" value={email}
                           onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" value={password}
                           onChange={e => setPassword(e.target.value)} required/>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button onClick={handleRegistration}>Register</button>
                </div>
            ) : null}
        </div>
    );
};

export default RegistrationComponent;
