//  render the log

import React, { useContext } from "react";
import styled from 'styled-components';

import logo from "../assets/images/logo/logo.png"
import heluhelulogo_white from "../assets/images/logo/heluhelulogo_white.png"
import { UserContext } from "../components/UserContext";


// Logo Wrapper
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
`

const LogoImg = styled.div`
    width: 29px;
    height: 29px;

    img {
        width: 100%;
        height: 100%
    }
`

const LogoText = styled.h2`
    font-size: 18px;
    margin: 0;
    margin-left: 4px;
    color: inherit;
    font-weight: 500;
`


export function Logo() {

    const { isDark } = useContext(UserContext)

    return (
        <a href ="/" style={{textDecoration:'none', color: "inherit"}}>
            <LogoWrapper>
                <LogoImg>
                    <img src={isDark === true ? heluhelulogo_white : logo} alt="Hawaiian Reader Logo"/>
                </LogoImg>

                <LogoText>heluhelu</LogoText>
            </LogoWrapper>
        </a>
    )
}