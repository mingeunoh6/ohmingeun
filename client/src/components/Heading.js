import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../firebase.js";
import styled from "@emotion/styled";
import { css, jsx, ClassName } from "@emotion/react";

const Header = styled.header`
  margin-left: 20px;
  margin-right: 20px;
  font-size: 15px;
  background-color: white;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    align-self: stretch;
    flex-grow: 1;
  }
  .center {
    min-width: 100px;
    padding: 10px;
    justify-content: space-between;
  }
  .right {
    min-width: 100px;
    padding: 10px;
    justify-content: flex-end;
  }
  .left {
    min-width: 100px;
    padding: 10px;
    justify-content: flex-start;
  }

  h1 {
    font-size: 2.3rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.2rem;
  }
  p {
    font-size: 1rem;
  }
`;

const Heading = () => {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const logoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <Header>
      <div className="left">
        <h1>OMG TEST</h1>
      </div>

      <div className="center">
        <Link to="/">Home </Link>
        {user.accessToken ? <Link to="/postTest">Post </Link> : null}
        {/* 
        <Link to="/postTest">Post </Link> */}
        <Link to="/PostList">List </Link>
        {user.accessToken ? null : <Link to="/Register">Register </Link>}

        <Link to="/Builder">Builder </Link>
        <Link to="/Grid">GridTester </Link>
        <Link to={`/threeJS/scene01`}>ThreeJS </Link>
      </div>
      <div className="right">
        {user.accessToken ? (
          <p onClick={logoutHandler}>Logout</p>
        ) : (
          <Link to="/login">Login </Link>
        )}
      </div>
    </Header>
  );
};

export default Heading;
