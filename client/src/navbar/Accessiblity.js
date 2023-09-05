import React, { useState } from "react";
import styled from "styled-components";

import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import apiFetch from "../api/ApiFetch";

import { DropdownItem } from "../profile/DropdownItem";
// import settings_black_24dp from "../assets/images/settings_black_24dp.svg"
// import account_circle_black_24dp from "../assets/images/account_circle_black_24dp.svg"
import logout_black_24dp from "../assets/images/black/logout_black_24dp.svg"
import person_black_24dp from "../assets/images/black/person_black_24dp.svg"
import { ThemeMode } from "./ThemeMode";

export function Accessibility() {
    const [isOpen, setIsOpen] = useState(false)
    const {setUser, user} = useContext(UserContext)

    function handleClick() {
      setIsOpen(!isOpen)
    }

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
        <NavLinksContainer>
            <ThemeMode />
            <MenuTrigger onClick={handleClick}>
              <ProfileAvatar style={{backgroundColor: `${user?.profile_color}`}}>
                <FirstLetter>{user.username[0]}</FirstLetter>
              </ProfileAvatar>
              {/* <ProfileImg src={account_circle_black_24dp} alt="profile image"></ProfileImg> */}
            </MenuTrigger>

            {isOpen && (
              <MenuDropdownList>
                <UserName>{user?.username}</UserName>
                <hr style={{backgroundColor: "#252525"}}/>
                <DropdownItem 
                  icon={person_black_24dp} 
                  icon_info="profile icon" 
                  text="Your Profile" 
                  goTo="/profile"
                />
                {/* <DropdownItem 
                  icon={settings_black_24dp} 
                  icon_info="settings icon" 
                  text="Settings" 
                  handleMenuItemClick={handleSettings}
                /> */}
                <DropdownItem 
                  icon={logout_black_24dp} 
                  icon_info="logout icon" 
                  text="Log out" 
                  handleMenuItemClick={handleLogout}
                  goTo="javascript:void(0)"
                />
              </MenuDropdownList>
            )}
        </NavLinksContainer>
    )
}

const UserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin: 0.8rem auto 1.2rem;
  color: #353535;
`

const MenuDropdownList = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 55px;
  right: 15px;
  background-color: #ced6e0;
  border-radius: 8px;
  padding: 10px 20px;
  // height: 250px;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19) !important;

  &:before {
    content: "";
    position: absolute;
    top: -5px;
    right: 8px;
    height: 20px;
    width: 20px;
    background: var(--secondary-bg);
    transform: rotate(45deg);
`
export const FirstLetter = styled.div`
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
`
export const ProfileAvatar = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transition: transform .2s;
    cursor: pointer;
    color: white;
    &:hover {
      transform: scale(1.2);
    }
`
const MenuTrigger = styled.div``

export const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    // z-index: 1;
`;



