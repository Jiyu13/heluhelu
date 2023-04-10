import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import {motion} from "framer-motion"
import { useState } from "react";
import { AccountContext } from "./AccountContext";



export function AccountBox() {
    const [isExpanded, setExpanded] = useState(false)
    const [active, setActive] = useState("login")

    // change and toggle the animation
    const playExpandingAnimation = () => {
        setExpanded(true);
        // set isExpanded to false 2.3s after
        setTimeout(() => {
            setExpanded(false);
          }, expandingTransition.duration * 1000 - 1500);
    }

    // == create functions to switch to login and signup ====
    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
          setActive("signup");
        }, 400);
    };
    
    const switchToLogin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("login");
        }, 400);
    };
    // console.log(active)
    // ======================================================

    // create context values
    const contextValue = {switchToSignup, switchToLogin}

    return (
        <AppContainer>
            
            {/* use AccountContext to spread the context value, make the child components below being able to access context values */}
            <AccountContext.Provider value={contextValue}>
                <BoxContainer>
                    <TopContainer>
                        <BackDrop
                            // initial -> play animation only when a style/state is changed
                            initial={false}
                            animate={isExpanded ? "expanded" : "collapsed"}
                            variants={backdropVariants}
                            transition={expandingTransition}
                        />
                        {active === "login" && (
                            <HeaderContainer>
                                <HeaderText>Welcome</HeaderText>
                                <HeaderText>Back</HeaderText>
                                <SmallText>Please sign-in to continue!</SmallText>
                            </HeaderContainer>
                        )}

                        {active === "signup" && (
                            <HeaderContainer>
                                <HeaderText>Create</HeaderText>
                                <HeaderText>Account</HeaderText>
                                <SmallText>Please sign-up to continue!</SmallText>
                            </HeaderContainer>
                        )}
                    </TopContainer>

                    <InnerContainer>
                        {active === "login" && <LoginForm/>}
                        {active === "signup" && <SignupForm/>}
                    </InnerContainer>
                </BoxContainer>
            </AccountContext.Provider>
        </AppContainer>
    )
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxContainer = styled.div`
    width: 280px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
`;

// top container that contains the backdrop and title
const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

// the animation drop using framer-motion
const BackDrop = styled(motion.div)`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60deg);
    top: -290px;
    left: -70px;
    background: rgb(46,204,113);
    background: linear-gradient(
        58deg, 
        rgba(46,204,113,1) 0%, 
        rgba(0,212,255,1) 100%
    );
`

// for create account or welcome text
const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    // move header 80px above
    margin: 80px 0;
`

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: #222;
    // color: #fff;
    z-index: 10;
    margin: 0;
`

const SmallText = styled.h5`
    color: #222;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
`

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
    // prevent padding (Signin&Login button) from making 100% width extend beyond InnerContainer
    box-sizing: border-box;
`

const backdropVariants = {
    expanded: {
      width: "233%",
      height: "1050px",
      borderRadius: "20%",
      transform: "rotate(60deg)",
    },
    collapsed: {
      width: "160%",
      height: "550px",
      borderRadius: "50%",
      transform: "rotate(60deg)",
    },
  };

// config for the transition, after 2.3s, it starts collapsing again
const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };
