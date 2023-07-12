// render the mobile view with a animated hamburger menu when screensize is smaller

// framer motion

import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MenuToggle } from "./MenuToggle";
import { Accessibility } from "./Accessiblity";
import { UserContext } from "../components/UserContext";



export function MobileNavLinks() {
    // state to toggle the changes, when click show the actual ul menu, otherwise hidden by default
    const [isOpen, setOpen] = useState(false)

    const {articles, article} = useContext(UserContext)
    const currentArticle = article !== null ? article : articles?.[0]

    return (
        <NavLinksContainer>
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)}/>

            {/* isOpen=true, grab LinksWrapper*/}
            {isOpen && (
                <LinksWrapper>
                    <LinkItem>
                        <Link href="/">Home</Link>
                    </LinkItem>

                    <LinkItem>
                        <Link href="/stats">My Stats</Link>
                    </LinkItem>

                    <LinkItem>

                        {/* {currentArticle ? 
                            <Link 
                                className="recent-reading"
                                href={`/articles/${currentArticle?.id}`}
                            >
                                Currently Reading
                                <HideTitle className="last-open-title">{currentArticle?.title}</HideTitle>
                            </Link>
                            :
                            <Link className="recent-reading" style={{cursor: "pointer"}}>
                                Currently Reading
                                <HideTitle className="last-open-title">No current reading.</HideTitle>
                            </Link>
                        }  */}
                            <Link 
                                href={`/articles/${currentArticle?.id}`}
                            >
                                Currently Reading
                            </Link>
                       </LinkItem>

                    <Marginer/>
                    <Accessibility/>
                </LinksWrapper>

            )}

            
        </NavLinksContainer>
    )
}

// const HideTitle = styled.div`
//     display: none;
//     // text-align: center;
//     flex-wrap: pre-wrap;
//     font-size: 14px;
// `

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
`;

const LinksWrapper = styled.ul`
    position: absolute;
    top: 45px;
    right: 10px;
    background-color: #ced6e0;
    border-radius: 8px;
    padding: 10px 20px;
    width: 150px;
    height: 250px;
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19) !important;

    &:before {
        content: "";
        position: absolute;
        top: -5px;
        right: 20px;
        height: 20px;
        width: 20px;
        background: var(--secondary-bg);
        transform: rotate(45deg);
    }
`;

// render a single link, click and redirect to a specific page
const LinkItem = styled.li`
    width: 100%;
    padding: 0.5rem 0;
    color: #222;
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    margin: 10px auto;

    &:hover {
        // border-bottom: 0.5px solid black;
        // width: 90%;
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
`;

const Marginer = styled.div`
    margin-top: 60px;
    border-top: 1px solid black;
    // rgba(255, 255, 255, 0.2);
    height: 1rem;
`;