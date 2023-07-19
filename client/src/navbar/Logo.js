//  render the log

import React from "react";
import styled from 'styled-components';

import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";


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
    font-size: 16px;
    margin: 0;
    margin-left: 4px;
    color: #222;
    font-weight: 500;
`


export function Logo() {
    return (
        <a href ="/" style={{textDecoration:'none'}}>
            <LogoWrapper>
                <LogoImg>
                    <img src={logo} alt="Hawaiian Reader Logo"/>
                </LogoImg>

                <LogoText>heluhelu</LogoText>
            </LogoWrapper>
        </a>
    )
}