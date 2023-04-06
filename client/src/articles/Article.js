import styled from "styled-components"


import left_arrow_icon from "../assets/images/arrowleft.svg"
import right_arrow_icon from "../assets/images/arrowright.svg"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../components/UserContext"
import { ArticleWord } from "./ArticleWord"
import { ArticleParagraph } from "./ArticleParagraph"



export function Article() {

    const {article, setArticle} = useContext(UserContext)
    
    const { id } = useParams()

    useEffect(() => {
        fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(prevArticle => {
            setArticle(prevArticle)
        })
    }, [id])

    const paragraphs = article?.text?.split("\n\n").map(p => p)


    return (
        <ArticleContainer>
            <SideBar >
                <SideBarImage>
                    <img src={left_arrow_icon} alt="left arrow icon"/>
                </SideBarImage>
            </SideBar>
            <ReadableArea>
                <ReadableContent>
                {paragraphs?.map(p => <ArticleParagraph words={p.split(" ")}/>)}
                </ReadableContent>
            </ReadableArea>
            <DictioanryArea></DictioanryArea>
            <SideBar>
                <SideBarImage>
                    <img src={right_arrow_icon} alt="right arrow icon"/>
                </SideBarImage>
            </SideBar>
        </ArticleContainer>
    )
}

const ArticleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 1px;
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    min-height: 450px;
    font-size: 20px;
    line-height: 1.6;
    height: 100%;
    position: fixed;
`

const SideBar = styled.div`
    font-family: readex pro,arial,sans-serif;
    word-spacing: 0;
    box-sizing: border-box;
    font-size: 19px;
    flex-shrink: 1;
    // min-width: 40px;
    width: 10%;
    cursor: pointer;
    text-align: center!important;
    flex-grow: 1;
    line-height: 1.6;
`

const SideBarImage = styled.div`
    width: 42px;
    height: 42px;
    margin: 100px auto 0 auto;
    opacity: .5;
`

const ReadableArea = styled.div`
    max-width: 725px;
    background-color: #333;
    color: #ddd;
    background-color: #333;
    color: #ddd;
`
const ReadableContent = styled.div`
    font-size: 20px;
    line-height: 1.6;
    padding: 8px;
`

const DictioanryArea = styled.div`
    background-color: #282828;
    color: #bbb;
    min-width: 250px;
    flex-basis: 25%;
    box-sizing: border-box;
    padding: 12px;
    user-select: none;
    line-height: 1.6;
`
