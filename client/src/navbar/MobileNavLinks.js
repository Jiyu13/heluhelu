// render the mobile view with a animated hamburger menu when screensize is smaller

// framer motion

import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MenuToggle } from "./MenuToggle";
import { Accessibility } from "./Accessiblity";
import { UserContext } from "../components/UserContext";

const HideTitle = styled.div`
    display: none;
`

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
`;

const LinksWrapper = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;

    // make the menu to pop up and the ul more like a menu
    background-color: #fff;
    width: 100%;
    flex-direction: column;
    position: fixed;
    top: 65px;
    left: 0;
`;

// render a single link, click and redirect to a specific page
const LinkItem = styled.li`
    // height: 100%;
    width: 100%;
    padding: 0 1.1em;
    color: # 222;
    font-weight: 500;
    font-size: 16px;
    // align-items: center;
    // justify-content: center;
    display: flex;
    flex-direction: column;

    margin-bottom: 10px;
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
`;

const Marginer = styled.div`
    height: 2em;
`;

export function MobileNavLinks() {
    // state to toggle the changes, when click show the actual ul menu, otherwise hidden by default
    const [isOpen, setOpen] = useState(false)

    const {articles} = useContext(UserContext)
    const lastOpen = articles[0]
    // console.log(lastOpen)

    return (
        <>
            <NavLinksContainer>
                <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)}/>

                {/* isOpen=true, grab LinksWrapper*/}
                {isOpen && (
                    <LinksWrapper>
                        <LinkItem>
                        <Link href="/">Home</Link>
                        </LinkItem>

                        <LinkItem>
                            <Link href="/articles">Articles</Link>
                        </LinkItem>

                        <LinkItem>
                            <Link href="/stats">My Stats</Link>
                        </LinkItem>

                        <LinkItem>
                            <Link className="recent-reading" href={`/articles/${lastOpen?.id}`}>Currently Reading</Link>
                            <HideTitle className="last-open-title">{lastOpen?.title}</HideTitle>
                        </LinkItem>

                        {/* <LinkItem>
                            <Link href="#">Upload Dictionary</Link>
                        </LinkItem> */}

                        <Marginer/>
                        <Accessibility/>
                    </LinksWrapper>

                )}

                
            </NavLinksContainer>
        </>
    )
}