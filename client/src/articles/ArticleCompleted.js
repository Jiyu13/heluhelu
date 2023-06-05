import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import close_btn from "../assets/images/close_btn.svg"


export function ArticleCompleted( {totolWords} ) {

    const {article} = useContext(UserContext)


    return (
        <>
            <PopupContainer>
                <ContainerHeader>
                    <Title>
                        Completed! - {article?.title}
                    </Title>
                    <CloseButton>
                        <Link to={`/`} >
                            <ButtonImage src={close_btn} alt="close icon"/>
                        </Link>
                    </CloseButton>
                </ContainerHeader>
                <Divider/>
                <ContainerBody>
                    <ArticleStats>
                        <TotalWords>Words Read - {totolWords}</TotalWords>
                        <KnownnWords>Known Word</KnownnWords>
                        <StudyingWords>Studying Word</StudyingWords>
                    </ArticleStats>
                    {/* <HomePageButton>Back To Home</HomePageButton> */}
                </ContainerBody>
            </PopupContainer>
            <Overlay></Overlay>
        </>
    )
}

// class="sc-lnOvfY hqOYSU"
const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    z-index: 10;
    width: 350px;
    max-width: 80%;
`
const ContainerHeader = styled.div`
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;
    align-item: center;

`
const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;    
`
const CloseButton = styled.button`
    cursor: pointer;    
    float: right;
    border: none;
    background-color: transparent;
`

const Divider = styled.hr`
    width: 90%;
    text-align: center;
    background-color: black;
    height: 1px;
`

const ButtonImage = styled.img`
    width: 20px;
    height: 20px;
`

const ContainerBody = styled.div`
    padding: 10px 20px;
`


const Overlay = styled.div`
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    // opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // pointer-events: none;
`




const ArticleStats = styled.div``
const TotalWords = styled.div``
const KnownnWords = styled.div``
const StudyingWords = styled.div``
const HomePageButton = styled.button``

