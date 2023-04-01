import React, { useState } from "react";
import styled from "styled-components";

import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

const AccessibilityContainer = styled.div`
    display: flex;
    margin-left: 10px;
`;

const ToggleModeButton = styled.div`
    
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #222;
    font-size: 13px;
    font-weight: 600;
    border-radius: 20px;
    background-color: transparent;
    border: 2px solid #00c9ff;
    transition: all 240ms ease-in-out;
    cursor: pointer;


    // transition color from #6adf76 to #00c9ff
    &:hover {
      color: #fff;
      background-color: #00c9ff;
    }

    // apply the styling for all button except for the last one
    &:not(:last-of-type) {
      margin-right: 7px;
    }
`;





export function Accessibility() {
    const [isClick, setClick] = useState(false)
    
    const {setDarkMode} = useContext(UserContext)
    

    function handleToggleMode() {
      setClick(!isClick)
    }

    isClick ? setDarkMode("light") : setDarkMode("dark")

    return (
        <AccessibilityContainer>
            
            {/* <RegisterButton>Create Account</RegisterButton>

            <LoginButton>Login</LoginButton> */}

            <ToggleModeButton onClick={handleToggleMode}>
              {isClick ? "🌞Light Mode" : "🌘Dark Mode"}
            </ToggleModeButton>

        </AccessibilityContainer>
    )
}



// const LoginButton = styled.button`
//   border: 0;
//   outline: 0;
//   padding: 8px 1em;
//   color: #222;
//   font-size: 13px;
//   font-weight: 600;
//   border-radius: 20px;
//   background-color: transparent;
//   border: 2px solid #00c9ff;
//   transition: all 240ms ease-in-out;
//   cursor: pointer;


//   // transition color from #6adf76 to #00c9ff
//   &:hover {
//     color: #fff;
//     background-color: #00c9ff;
//   }

//   // apply the styling for all button except for the last one
//   &:not(:last-of-type) {
//     margin-right: 7px;
//   }
// `;

// const RegisterButton = styled.button`
//   border: 0;
//   outline: 0;
//   padding: 8px 1em;
//   color: #fff;
//   font-size: 13px;
//   font-weight: 600;
//   border-radius: 20px;
//   background-color: #6adf76;
//   background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
//   transition: all 240ms ease-in-out;
//   cursor: pointer;
//   &:hover {
//     background-color: #00c9ff;
//   }
//   &:not(:last-of-type) {
//     margin-right: 7px;
//   }
// `;