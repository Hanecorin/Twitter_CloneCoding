import { async } from "@firebase/util";
import { authService} from "fbase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }

    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
                } else {
                data = await signInWithEmailAndPassword(authService, email, password);
                }
                
            console.log(data);
        } catch (error) {
            setError(error.message);
        }

    };
    const toggleAccount = () => setNewAccount(prev => ! prev);
    const onSocialClick = async (event) => {
        const {
        target: { name },
        } = event;
        let provider;
        if (name === "google") {
        provider = new GoogleAuthProvider();
        }
        await signInWithPopup(authService, provider);
        };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="이메일" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="비밀번호" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">구글로 로그인</button>
            </div>
        </div>)
};
export default Auth;