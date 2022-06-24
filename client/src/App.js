import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./reducer/userSlice";
import firebase from "./firebase.js";
import { Global } from "@emotion/react";
import Heading from "./components/Heading";
import ThreeStarter from "./routers/THREE";
import Posttest from "./routers/Posttest";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Scrollcalculator from "./routers/Scrollcalculator";
import PostList from "./routers/PostList";
import PostArea from "./components/Post/PostArea";
import Edit from "./components/Post/Edit";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Builder from "./routers/Builder";
import GridLayout from "./testComponents/GridLayout";
import GlobalCssReset from "./style/global/reset";
import ThreeWeb from "./routers/ThreeWeb";
import styled from "@emotion/styled";
import { css, jsx, ClassName } from "@emotion/react";

const BodyWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  & .mainWrapper {
    align-self: stretch;
    flex-grow: 1;
    height: 100%;
    border: 1px solid black;
    overflow: scroll;
  }
`;

function App() {
  const dispatch = useDispatch();

  //login
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(logoutUser());
      }
    });
  }, []);

  // //logout
  // useEffect(() => {
  //   firebase.auth().signOut();
  // }, []);

  return (
    <>
      <Global styles={GlobalCssReset} />
      <BodyWrapper>
        <Heading />
        <section className="mainWrapper">
          <Routes>
            <Route path="/" element={<ThreeStarter />} />
            <Route path="/threeJS/:sceneNo" element={<ThreeWeb />} />
            <Route path="postTest" element={<Posttest />} />
            <Route path="scroll" element={<Scrollcalculator />} />
            <Route path="postList" element={<PostList />} />
            <Route path="/post/:postNum" element={<PostArea />} />
            <Route path="/edit/:postNum" element={<Edit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/grid" element={<GridLayout />} />
          </Routes>
        </section>
      </BodyWrapper>
    </>
  );
}

export default App;
