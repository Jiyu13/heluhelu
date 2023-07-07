import styled from "styled-components";
import { useState } from "react";

import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";

import palm_tree from "../assets/images/palm_tree.jpg"



export function AccountBox() {
    const [errors, setErrors] = useState(null)
    const [isLogin, setLogin] = useState("login")
    const [visible, setVisible] = useState(false)

    function ToggleIcon() {
        setVisible(!visible)
    }


    function handleToSignup() {
        setLogin("signup")
    }

    function handleToLogin() {
        setLogin("login")
    }

    return (
        <AppContainer>
            {
                errors && (
                    <EmptyDiv onClick={() => setErrors(null)}/>

                )
            }
            {
                isLogin=== "login" ? 
                <LoginPage handleToSignup={handleToSignup} errors={errors} setErrors={setErrors} ToggleIcon={ToggleIcon} visible={visible}/>
                :
                <SignupPage handleToLogin={handleToLogin} errors={errors} setErrors={setErrors} ToggleIcon={ToggleIcon} visible={visible}/>
            
            }
        </AppContainer>
    )
}

const EmptyDiv = styled.div`
    width: 100%; 
    height: 100%;
    position: fixed;
`

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