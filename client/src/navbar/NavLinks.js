// put all the navigation links together

import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../components/UserContext";


export function NavLinks() {

    const {articles} = useContext(UserContext)
    let lastOpen
    if (articles) {
        lastOpen = articles[0]
    }

    return (
        <>
            <NavLinksContainer>
                <LinksWrapper>

                    <LinkItem>
                        <Link href="/">Home</Link>
                    </LinkItem>
                    <LinkItem>
                        <Link href="/articles">Articles</Link>
                    </LinkItem>

                    <LinkItem>
                        <Link href="#">My Stats</Link>
                    </LinkItem>
                    
                    <LinkItem>
                        <Link className="recent-reading" href={`/articles/${lastOpen?.id}`}>Recent Reading</Link>
                        <HideTitle className="last-open-title">{lastOpen?.title}</HideTitle>
                    </LinkItem>

                    <LinkItem>
                        <Link href="/upload_dictionary">Upload Dictionary</Link>
                    </LinkItem>

                </LinksWrapper>
            </NavLinksContainer>
        </>
    )
}

const HideTitle = styled.div`
    display: none;
`

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const LinksWrapper = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
`;

// render a single link, click and redirect to a specific page
const LinkItem = styled.li`
    height: 100%;
    padding: 0 1.1em;
    color: # 222;
    font-weight: 500;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    // avoid link goes down when hover
    border-top: 2px solid transparent;
    transition: all 220mx ease-in-out;

    // add animation to link
    &:hover {
        border-top: 2px solid #2ecc71
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
`;

