import styled from "styled-components";
import { useState } from "react";

import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";

import palm_tree from "../assets/images/palm_tree.jpg"



export function AccountBox() {
    // const [isExpanded, setExpanded] = useState(false)
    // const [active, setActive] = useState("login")

    // // change and toggle the animation
    // const playExpandingAnimation = () => {
    //     setExpanded(true);
    //     // set isExpanded to false 2.3s after
    //     setTimeout(() => {
    //         setExpanded(false);
    //       }, expandingTransition.duration * 1000 - 1500);
    // }

    // // == create functions to switch to login and signup ====
    // const switchToSignup = () => {
    //     playExpandingAnimation();
    //     setTimeout(() => {
    //       setActive("signup");
    //     }, 400);
    // };
    
    // const switchToLogin = () => {
    //     playExpandingAnimation();
    //     setTimeout(() => {
    //         setActive("login");
    //     }, 400);
    // };
    // // ======================================================

    // // create context values
    // const contextValue = {switchToSignup, switchToLogin}

    const [isLogin, setLogin] = useState("login")

    function handleToSignup() {
        setLogin("signup")
    }

    function handleToLogin() {
        setLogin("login")
    }


    return (
        <AppContainer>
            {
                isLogin=== "login" ? 
                <LoginPage handleToSignup={handleToSignup}/>
                :
                <SignupPage handleToLogin={handleToLogin}/>
            
            }
        </AppContainer>
    )
}

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;

  background-image: url(${palm_tree});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;