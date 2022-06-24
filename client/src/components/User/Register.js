import React, { useState } from "react";
import firebase from "../../firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/compat/auth";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [flag, setFlag] = useState(false);
  const [nameCheck, setNameCheck] = useState(false)
  const [nameInfo, setNameInfo] = useState("")

  let navigate = useNavigate();

  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(name && email && password && passwordCheck)) {
      return alert("Fill all the empty");
    }
    if (password !== passwordCheck) {
      return alert("password not match");
    }

    if (!nameCheck) {
      return alert("닉네임 중복검사좀")
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createdUser.user.updateProfile({
      displayName: name,
    });

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };
    axios.post("/api/user/register", body).then((response) => {
      if (response.data.success) {
        setFlag(false);
        //회원가입 성공시
        navigate("/login");
      } else {
        //회원가입 실패시
        return alert("F a i l");
      }
    });
  };


  const nameCheckFunc = (e) => {

    e.preventDefault();
    if (!name) {
      return alert("닉네임 입력해")
    }

    let body = {
      displayName: name
    }

    axios.post("/api/user/nameCheck", body).then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true)
          setNameInfo("사용 가능")
        } else {
          setNameInfo("사용 불가")
        }

      }
    })

  }

  return (
    <div>
      <div>
        <label>nickname</label>
        <input type="name" onChange={(e) => setName(e.currentTarget.value)} />
        <button onClick={nameCheckFunc}>닉네임 중복검사</button>
        {nameInfo}
      </div>

      <label>email</label>
      <input type="email" onChange={(e) => setEmail(e.currentTarget.value)} />
      <label>password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
        minLength={8}
      />
      <label>password check</label>
      <input
        type="password"
        minLength={8}
        onChange={(e) => setPasswordCheck(e.currentTarget.value)}
      />
      <button onClick={RegisterFunc}>
        sign up
      </button>
    </div>
  );
};

export default Register;
