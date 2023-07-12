import React from "react";
import styled from "styled-components";

import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import apiFetch from "../api/ApiFetch";


export function Accessibility() {

    const {setUser, user} = useContext(UserContext)

    // =========== logout =================================
    function handleLogout() {
      apiFetch('/logout', {
        method: "DELETE"
      })
      .then(() => {
        setUser(null)
      })
    }

    return (
        <AccessibilityContainer>
            <ShowAccount>{user.username}</ShowAccount>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton> 

        </AccessibilityContainer>
    )
}


const ShowAccount = styled.div`
    margin-right: 5px;
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    border-radius: 20px;
    background-color: transparent;
    background-image: linear-gradient(to right, #00B09B, #96C93D);
    transition: all 240ms ease-in-out;
    cursor: pointer;
`


const AccessibilityContainer = styled.div`
    display: flex;
    margin-left: 10px;
`;

const LogoutButton = styled.div`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #222;
    font-size: 13px;
    font-weight: 600;
    border-radius: 20px;
    background-color: transparent;
    border: 2px solid #00B09B;
    transition: all 240ms ease-in-out;
    cursor: pointer;


    // transition color from #6adf76 to #00c9ff
    &:hover {
      color: #fff;
      background-color: #00B09B;
      background-image: linear-gradient(to right, #00B09B, #96C93D);
    }

    // apply the styling for all button except for the last one
    &:not(:last-of-type) {
      margin-right: 7px;
    }
`;