import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "name") {
            setName(value);
        }
    };

    const CreateAccount = async (event) => {
        event.preventDefault();
        try {

            const data = await authService.createUserWithEmailAndPassword(email, password); console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={CreateAccount}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    name="name"
                    type="name"
                    placeholder="name"
                    required
                    value={name}
                    onChange={onChange}
                />
                {/* <input
                    name="code"
                    type="text"
                    placeholder="code"
                    required
                    value={code}
                    onChange={onChange}
                    /> */}

                <input
                    type="submit"

                />
                {error}
            </form>
        </div>

    );

};

export default SignUp;