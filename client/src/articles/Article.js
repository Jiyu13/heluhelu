import styled from "styled-components"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../components/UserContext"

import book_material_icon from "../assets/images/book_material_icon.svg"
import left_arrow_icon from "../assets/images/arrowleft.svg"
import right_arrow_icon from "../assets/images/arrowright.svg"


import { ArticleParagraph } from "./ArticleParagraph"
import { TranslationWord } from "./TranslationWord";

const PAGE_SIZE = 250;

export function Article() {

    const {article, setArticle, articles, setArticles, user} = useContext(UserContext)
    const {chosen, setChosen, targetWord, setErrors} = useContext(UserContext)
    
    const {page, setPage} = useContext(UserContext)
    const { id } = useParams()

    useEffect(() => {
        fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(prevArticle => {
            setArticle(prevArticle)
            setArticles([prevArticle, ...articles])
        })
    }, [id]) // [id] eslint-disable-next-line

    // ==========================================================================
    const words_length = article?.text?.replace(/(\r\n|\n|\r)/gm, "").split(" ").length
    const pages = Math.ceil(words_length / 250)

    // ==========================================================================
    const textInPages = article?.text?.split(" ")                               // get all words
                        .flatMap(word => word.replace("\n\n", "##\n\n")         // replace "\n\n" to "##\n\n"
                        .split("\n\n"))                                         // split by \n\n
                        .slice(
                            (page-1) * PAGE_SIZE, 
                            (page-1) * PAGE_SIZE + PAGE_SIZE)                   // slice, get words from [0-250], page increases/decreases by 1
                        .join(' ')                                              // join 250 words with space to make it a paragraph
                        .replaceAll("##", "\n\n") // 
    const paragraphs = textInPages?.split("\n\n").map(p => p)                   // split the formatted paragraph by \n\n
    // ==========================================================================

    // ===== handle show next/prev page container & update current_page =========
    function handlePrevPage() {
        const prevPage = page - 1 > 0 ? page - 1  : page
        setPage(prevPage)
        handleCurrentPage(prevPage)
    }

    function handleNextPage() {
        const nextPage = page + 1 < pages ? page + 1 : pages
        setPage(nextPage)
        handleCurrentPage(nextPage)
    }

    function handleCurrentPage(curr_page) {
        fetch(`/user_article/${article.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: user.id,
                article_id: article.id,
                current_page: curr_page,
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    // ==========================================================================


    // ========= Search word ====================================================
    function handleChange(e) {
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
            
            <SideBar onClick={handlePrevPage}>
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
                <>words: {words_length}</>
                <br/>
                <PagesContainer>
                    <BookIcon><img src={book_material_icon} alt="book icon"/></BookIcon>
                    <PageDisplay>pg: {page} of {pages}</PageDisplay>
                </PagesContainer>
                {/* <br/> */}
                <SearchArea 
                    type="text"
                    placeholder={targetWord.replace(/!?.:,/g, "")}
                    onChange={handleChange} />

                <TranslationArea>
                    {chosen?.map(word => <TranslationWord word={word}/>)}
                </TranslationArea>
            </DictionaryArea>
            
            <SideBar onClick={handleNextPage}>
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
    overflow: auto;
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
    // padding: 12px;
    padding: 0 12px 12px 12px;
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

const PagesContainer = styled.div`
    font-size: 20px;
    line-weight: 1.6;
    display: block;
`

const PageDisplay = styled.div`
    font-size: 12px;
    font-weight: 700;
    line-weight: 1;
    display: inline-block;
    vertical-align: top;
    padding-top:8px;
    padding-bottom: 10px;
    margin-left: 8px;
`

const BookIcon = styled.div`
    margin-top: 6px;
    display: inline-block;
    vertical-align: top;
    width: 30xpx;
    height: 25px;
`