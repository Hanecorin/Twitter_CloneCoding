import { authService } from "fbase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import AuthForm from "components/AuthForm";

import { Link } from "react-router-dom";

const Auth = () => {
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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    구글로 로그인 <FontAwesomeIcon icon={faGoogle} />
                </button>
            </div >
            <Link to="/SignUp">
                <button>이동하기</button>
            </Link>
        </div>
    )
};
export default Auth;