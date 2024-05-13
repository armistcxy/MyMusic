import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from 'axios';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const LOGIN_URL = '/auth';

const Container = styled.div`
    background: #222D32;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
        background: #1A2226;
        padding: 40px;
        border-radius: 8px;
        width: 300px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 24px;
        color: #ECF0F5;
        margin-bottom: 20px;
    }

    label {
        display: block;
        font-size: 14px;
        color: #ECF0F5;
        text-align: left;
        margin-bottom: 5px;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: none;
        border-radius: 4px;
        background: #1A2226;
        color: #ECF0F5;
        border-bottom: 2px solid #0DB8DE;
        outline: none;
    }

    button {
        width: 100%;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        background-color: #0DB8DE;
        margin-bottom: 10px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0AAABC;
    }

    .error {
        color: #FF5252;
        margin-bottom: 10px;
    }

    .signup-link {
        font-size: 14px;
        color: #A2A4A4;
    }

    .signup-link a {
        color: #0DB8DE;
        text-decoration: none;
    }
`;

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <Container>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "error" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <br />
                        <button type="submit">Sign In</button>
                        <p className="signup-link">
                        Need an Account?<br />
                        <a href="/Register">Sign Up</a>
                    </p>
                    </form>
                    
                </section>
            )}
        </Container>
    )
}

export default Login;