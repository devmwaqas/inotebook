import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

    const [user, setUser] = useState({ name: "", email: "", password: "", c_password: ""  });

    const onchange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }
    
    const host = "http://localhost:5000/api/";
    let navigate = useNavigate();

    const registerUser = async (e) => {
        // console.log(user);
        e.preventDefault();

        const response = await fetch(`${host}auth/registration`, {
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

    return (
        <div className="contaniter my-5">

            <form className="row g-3">

                <div className="col-md-6">
                    <label htmlFor="inputName4" className="form-label">Name</label>
                    <input onChange={onchange} type="name" name="name" className="form-control" id="inputName1" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input onChange={onchange} type="email" name="email" className="form-control" id="inputEmail4" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input onChange={onchange} type="password" name="password" className="form-control" id="inputPassword4" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputPassword6" className="form-label">Confirm Password</label>
                    <input onChange={onchange} type="password" name="c_password" className="form-control" id="inputPassword6" />
                </div>

                <div className="col-12">
                    <button type="button" onClick={registerUser}  className="btn btn-primary">Sign up</button>
                </div>
            </form>

        </div>
    )
}
