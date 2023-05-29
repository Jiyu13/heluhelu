import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import close_btn from "../assets/images/close_btn.svg"


export function ArticleCompleted() {

    const [isClose, setClose] = useState(false)

    const {article} = useContext(UserContext)

    let navigate = useNavigate()
    

    function handleClosePopup() {
        
        navigate('/')
        // setClose(false)
        setClose(true)
    }

    const display = isClose ? "" : "none"

    // console.log(isClose)
    return (
        // style={{display: display}}
        <CompleteContainer>
            <ContainerHeader>
                <Title>
                    Reading Completed! - {article?.title}
                </Title>
                {/* <CloseButton onClick={handleClosePopup}>&times;</CloseButton> */}
                <CloseButton >
                {/* style={{"color": "inherit"}} */}
                    <Link to={`/`} >
                        <ButtonImage src={close_btn} alt="close icon"/>
                    </Link>
                </CloseButton>
            </ContainerHeader>
            <Divider/>
            <ContainerBody>
                <ArticleStats>
                    <TotalWords>Words Read</TotalWords>
                    <KnownnWords>Known Word</KnownnWords>
                    <StudyingWords>Studying Word</StudyingWords>
                </ArticleStats>
                {/* <HomePageButton>Back To Home</HomePageButton> */}
            </ContainerBody>
        </CompleteContainer>
    )
}

const ButtonImage = styled.img`
    width: 28px;
    height: 28px;
    opacity: 0.5;
    padding: 0;
    margin: 3px 0 0 0;
    overflow-clip-margin: content-box;
    overflow: clip;
`


const CompleteContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    z-index: 10;
    width: 400px;
    max-width: 80%;
    padding: 20px;
`

const ContainerHeader = styled.div`
    display: block;
    
`
const Title = styled.div`
    display: inline-block;
    
`
const CloseButton = styled.button`
    display: inline-block;
    float: right;
`


const Divider = styled.hr`
    width: 90%;
    text-align: center;
    background-color: black;
    height: 1px;
`


const ContainerBody = styled.div``
const ArticleStats = styled.div``
const TotalWords = styled.div``
const KnownnWords = styled.div``
const StudyingWords = styled.div``
const HomePageButton = styled.button``

