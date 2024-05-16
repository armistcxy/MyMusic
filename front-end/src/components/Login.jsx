import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from 'axios';
import styled from 'styled-components';
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = 'http://localhost:8000/users/login';

const Container = styled.div`
    background: #1b3029;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;

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
        border-bottom: 2px solid #0d5919;
        outline: none;
    }

    button {
        width: 100%;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        background-color: #0d5919;
        margin-bottom: 10px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #1fbd38;
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
        color: #18a72e;
        text-decoration: none;
    }
`;

const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const a = true;
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [{ }, dispatch] = useStateProvider()
    const navigate = useNavigate();

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
                JSON.stringify({ email : user, password : pwd, remember_me : a }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.access_token;
            const refreshToken = response?.data?.refresh_token;
            const roles = response?.data?.roles;
            console.log(accessToken);
            dispatch({ type: reducerCases.SET_TOKEN, token: accessToken});
            dispatch({type: reducerCases.USER_LOGGED_IN});
            setSuccess(true);
            navigate('/');
            setAuth({ user, pwd, accessToken, refreshToken});
            setUser('');
            setPwd('');
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
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "error" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Email:</label>
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
                        <a href="/register">Sign Up</a>
                    </p>
                    </form>
                    
                </section>
            )}
        </Container>
    )
}

export default Login;