import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import apiFetch from "../api/ApiFetch";

import { DropdownItem } from "../profile/DropdownItem";
import logout_black_24dp from "../assets/images/black/logout_black_24dp.svg"
import person_black_24dp from "../assets/images/black/person_black_24dp.svg"
import home_black_24dp from "../assets/images/black/home_black_24dp.svg"
import equalizer_black_24dp from "../assets/images/black/equalizer_black_24dp.svg"
import book_black_24dp from "../assets/images/black/book_black_24dp.svg"
import { FirstLetter, MenuTrigger, NavLinksContainer, ProfileAvatar } from "./Accessiblity";

export function MobileNavLinks() {
    const [isOpen, setIsOpen] = useState(false)
    const {setUser, user, firstArticle, article} = useContext(UserContext)

    const currentArticle = article !== null ? article : firstArticle
    const firstLetter = user?.username[0]

    function handleClick() {
      setIsOpen(!isOpen)
    }

    let menuRef = useRef()
    useEffect(() => {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handler)

      return() =>{
        document.removeEventListener("mousedown", handler);
      }
    })

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
        <NavLinksContainer ref={menuRef}>
            <MenuTrigger onClick={handleClick}>
              <ProfileAvatar style={{backgroundColor: `${user.profile_color}`}}>
                <FirstLetter>{firstLetter.toUpperCase()}</FirstLetter>
              </ProfileAvatar>
            </MenuTrigger>

            {isOpen && (
              <MenuDropdownList>
                <UserName>{user?.username}</UserName>
                <hr style={{backgroundColor: "#252525"}}/>
                <DropdownItem 
                  icon={home_black_24dp} 
                  icon_info="homepage-icon" 
                  text="Home" 
                  goTo="/"
                />
                <DropdownItem 
                  icon={equalizer_black_24dp} 
                  icon_info="my stats icon" 
                  text="My Stats" 
                  goTo="/stats"
                />
                <DropdownItem 
                  icon={book_black_24dp} 
                  icon_info="currently reading icon" 
                  text="Currently Reading" 
                  goTo={`/articles/${currentArticle?.id}`}
                />
                <DropdownItem 
                  icon={person_black_24dp} 
                  icon_info="profile icon" 
                  text="Your Profile" 
                  goTo="/profile"
                />
                <DropdownItem 
                  icon={logout_black_24dp} 
                  icon_info="logout icon" 
                  text="Log out" 
                  handleClick={handleLogout}
                  goTo=""
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
  }
`
// const ProfileImg = styled.img`
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   transition: transform .2s;
//   cursor: pointer;

//   &:hover {
//     transform: scale(1.5);
//   }
// `