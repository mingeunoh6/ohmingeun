import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/compat/auth";

const Login = () => {

  const user = useSelector((state) => state.user);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();
  const SignInFunc = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      return alert("모든 값을 채워줘");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMsg("존재하지 않는 이메일입니다.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMsg("로그인이 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }, [errorMsg]);

  return (
    <div>
      <form>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {errorMsg != "" && <p>{errorMsg}</p>}
        <button onClick={SignInFunc}>sign in</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          signUp
        </button>
      </form>
    </div>
  );
};

export default Login;
