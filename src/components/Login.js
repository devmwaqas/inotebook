import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const host = "http://localhost:5000/api/";
    let navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "" });
    const emailRef = useRef(null);
    const passRef = useRef(null);

    const getlogin = async () => {
        if (user.email === "") {
            emailRef.current.focus();
        } else if (user.password === "") {
            passRef.current.focus();
        } else {

            const response = await fetch(`${host}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();
            if (result.msg === 'success') {
                props.showAlert('success', result.response);
                localStorage.setItem('token', result.token);
                navigate('/notes');
            } else {
                props.showAlert('danger', result.error);
            }

        }
    }

    const changevalues = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <main className="form-signin">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className="form-floating">
                        <input type="email" name="email" ref={emailRef} className="form-control" id="floatingInput" placeholder="name@example.com" onChange={changevalues} />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" name="password" ref={passRef} className="form-control" id="floatingPassword" placeholder="Password" onChange={changevalues} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="button" onClick={getlogin}> Sign in </button>
                </form>
            </main>
            {/* <form>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form> */}
        </div>
    )
}