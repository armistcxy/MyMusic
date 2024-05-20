import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from 'axios';
import styled from 'styled-components';
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LOGIN_URL = 'http://localhost:8000/users/login';

const Container = styled.div`
    background: #1b3029;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
`;

const ContentWrapper = styled.div`
    display: flex;
    width: 600px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const Sidebar = styled.div`
    background: linear-gradient(135deg, #019, #02272e, #1fbd38);
    color: #ECF0F5;
    width: 100%;
    max-width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px 0 0 8px;

    @media (min-width: 768px) {
        width: 50%;
        padding: 40px 20px;
    }

    h2 {
        font-size: 250%;
        font-family: 'Playfair Display', serif;
        margin-bottom: 10px;
        margin-top: -20px;
        text-align: center;
    }

    p {
        font-family: 'Abel', sans-serif;
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
    }
`;

const FormContainer = styled.div`
    width: 50%;
    background: #1A2226;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0 8px 8px 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

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
        margin-bottom: 10px;
        border: none;
        border-radius: 4px;
        background: #1A2226;
        color: #ECF0F5;
        border-bottom: 2px solid #0d5919;
        outline: none;
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        label {
            margin: 0;
            margin-right: 10px;
        }

        input[type="checkbox"] {
            margin-left: 0;
        }
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

    .show-password-btn {
        margin-top: -10px;
        margin-bottom: 20px;
        background-color: transparent;
        border: none;
        color: #18a72e;
        cursor: pointer;
        font-size: 12px;
    }

    .show-password-btn:hover {
        color: #1fbd38;
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
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [{ }, dispatch] = useStateProvider();
    const navigate = useNavigate();

    // Focus on email input on component mount
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // Clear error message on input change
    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    // Toggle password visibility
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password, remember_me: rememberMe }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const { access_token, refresh_token } = response?.data;
            console.log(access_token);
            dispatch({ type: reducerCases.SET_TOKEN, token: access_token });
            dispatch({ type: reducerCases.USER_LOGGED_IN });
            dispatch({ type: reducerCases.SET_READY, readyToListen: false });
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
            setAuth({ email, password, access_token, refresh_token });
            setIsSuccess(true);
            toast.success("Login successfully.");
            navigate('/');
            setEmail('');
            setPassword('');
        } catch (err) {
            if (!err?.response) {
                //setErrMsg('No Server Response');
                toast.error("No Server Response");
            } else if (err.response?.status === 400) {
                //setErrMsg('Missing Username or Password');
                toast.error("Missing Username or Password");
            } else if (err.response?.status === 401) {
                //setErrMsg('Unauthorized');
                toast.error("Incorrect username or password.");
            } else {
                //setErrMsg('Login Failed');
                toast.error("Login Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <Container>
            <ContentWrapper>
                <Sidebar>
                    <h2>Welcome</h2>
                    <p>
                        Discover and enjoy your favorite music with Flotify.
                    </p>
                </Sidebar>
                <FormContainer>
                    {isSuccess ? (
                        <section>
                            <h1>You are logged in!</h1>
                            <p>
                                <a href="/">Go to Home</a>
                            </p>
                        </section>
                    ) : (
                        <section>
                            <p ref={errRef} className={errMsg ? "error" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <Form onSubmit={handleSubmit}>
                                <h1>Sign In</h1>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                                <label htmlFor="password">Password:</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <button type="submit">Sign In</button>
                                <p className="signup-link">
                                    Need an Account?<br />
                                    <a href="/register">Sign Up</a>
                                </p>
                            </Form>
                        </section>
                    )}
                </FormContainer>
            </ContentWrapper>
        </Container>
    );
};

export default Login;
