import styled from "styled-components"


import left_arrow_icon from "../assets/images/arrowleft.svg"
import right_arrow_icon from "../assets/images/arrowright.svg"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../components/UserContext"
import { ArticleParagraph } from "./ArticleParagraph"
import { TranslationWord } from "./TranslationWord";



export function Article() {

    const {article, setArticle} = useContext(UserContext)
    const {chosen, setChosen, target, setErrors} = useContext(UserContext)
    
    
    const { id } = useParams()

    useEffect(() => {
        fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(prevArticle => {
            setArticle(prevArticle)
        })
        // eslint-disable-next-line
    }, [id])

    const paragraphs = article?.text?.split("\n\n").map(p => p)

    // ========= Search word ==================================
    function handleChange(e) {
        // console.log(e.target.value)
        fetch(`/search/${e.target.value}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setChosen(data)
                })
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

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
            
            <DictionaryArea>
                {/* <TranslationContent/> */}
                <SearchArea 
                    type="text"
                    placeholder={target.replace(/!?.:,/g, "")}
                    onChange={handleChange} />

                <TranslationArea>
                    {chosen?.map(word => <TranslationWord word={word}/>)}
                </TranslationArea>
            </DictionaryArea>
            
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
    height: calc(100% - 60px);  // Handle top bar which is 60px
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

const DictionaryArea = styled.div`
    background-color: #282828;
    color: #bbb;
    min-width: 250px;
    flex-basis: 25%;
    box-sizing: border-box;
    padding: 12px;
    line-height: 1.6;

    overflow: auto;
`

const SearchArea = styled.input`
    border-radius: 8px;
    height: 40px;
    width: 180px;
    font-size: 25px;
` 

const TranslationArea = styled.div``