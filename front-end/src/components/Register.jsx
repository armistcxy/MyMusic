import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[a-z0-9]+(?:[-_.+!#$%&'*\\/=?^`{|}]?[a-z0-9]+)*@[a-z0-9]+(?:[-.][a-z]+)*\.[a-z]+/;
const REGISTER_URL = 'http://127.0.0.1:8000/users/register';

const Container = styled.div`
   
    background: #1b3029;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .register {
        display: block;
        background-color: #1A2226;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
    }

    h1 {
        font-size: 24px;
        color: #ECF0F5;
        margin-bottom: 20px;
        text-align: center;
    }

    label {
        font-size: 16px;
        color: #ECF0F5;
        display: block;
        margin-bottom: 5px;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        background: #1A2226;
        color: #ECF0F5;
        border-bottom: 2px solid #0d5919;
    }

    .invalid-feedback {
        color: #ff0000;
        font-size: 15px;
    }

    .valid-feedback {
        color: #ff0000;
        font-size: 15px;
        visibility: hidden;
    }
   
    
    .register {
        /* Các thuộc tính hiện tại của container form */
        position: relative; /* Đặt vị trí tương đối để thông báo lỗi được đặt trong phạm vi của container form */
    }
    

    button {
        width: 100%;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        background-color: #0d5919;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #1fbd38;
    }

    .already-registered {
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
        color: #A2A4A4;
    }

    .already-registered a {
        color: #18a72e;
        text-decoration: none;
    }
`;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validName || !validPwd || !validMatch || !validEmail) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, name: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response));
            toast.success("Login successfully.");
            navigate('/login');
            setSuccess(true);
            setEmail('');
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                //setErrMsg('No Server Response');
                toast.error("No Server Response");
            } else if (err.response?.status === 409) {
                //setErrMsg('Username Taken');
                toast.error("Username Taken");
            } else {
                //setErrMsg('Registration Failed')
                toast.error("Registration Failed");
            }
            errRef.current.focus();
        }
    }

    return (
        <Container>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className="register">

                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            Email:
                            <input
                                type="text"
                                placeholder="Enter your email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </label>
                        {!validEmail && email ? (
                            <span className="invalid-feedback">Invalid email format</span>
                        ) : <span className="valid-feedback" > t  </span>}

                        <label htmlFor="username">
                            Username:
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                placeholder="Enter your username"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </label>
                        {!validName && user ? (
                            <span className="invalid-feedback">Invalid username format</span>
                        ) : <span className="valid-feedback" > t  </span>}

                        <label htmlFor="password">
                            Password:
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </label>
                        {!validPwd && pwd ? (
                            <span className="invalid-feedback">Invalid password format</span>
                        ) : <span className="valid-feedback" > t  </span>}

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <input
                                type="password"
                                id="confirm_pwd"
                                placeholder="Confirm your password"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                            />
                        </label>
                        {!validMatch && matchPwd ? (
                            <span className="invalid-feedback">Confirm password don't match with password</span>
                        ) : <span className="valid-feedback" > t  </span>}
                        <p ref={errRef} className={errMsg ? "error" : "offscreen"} aria-live="assertive">{errMsg ? errMsg : " "}</p>
                        <button disabled={!validName || !validPwd || !validMatch || !validEmail}>Sign Up</button>
                    </form>
                    <p className="already-registered">
                        Already registered? <a href="/login">Sign In</a>
                    </p>
                </section>
            )}
        </Container>
    )
}

export default Register;
