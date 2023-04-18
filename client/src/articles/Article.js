import styled from "styled-components"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../components/UserContext"

import book_material_icon from "../assets/images/book_material_icon.svg"
import left_arrow_icon from "../assets/images/arrowleft.svg"
import right_arrow_icon from "../assets/images/arrowright.svg"
import add_icon from "../assets/images/add_icon.svg"


import { ArticleParagraph } from "./ArticleParagraph"
import { TranslationWord } from "./TranslationWord";
import { useState } from "react"
import { CustomWord } from "./CustomWord"

const PAGE_SIZE = 250;

export function Article() {

    const [wordExistError, setWordExistError] = useState(null)
    const [customWord, setCustomWord] = useState(null)
    const [targetWord, setTargetWord] = useState(null)

    const {article, setArticle, 
           articles, setArticles, 
           user, chosen, setChosen, 
           setErrors, 
           page, setPage,
           setAddBtn,
           checkAvaliable,
           showCustomForm, setCustomForm
        } = useContext(UserContext)
    
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
    const textInPages = article?.text?.split(" ")                                      // get all words
                        .map(word => word.replaceAll("\n\n", "\n"))
                        .flatMap(word => word.replaceAll("\n", "##\n").split("\n"))    // replace "\n\n" to "##\n\n" then split by \n\n
                        .slice(
                            (page-1) * PAGE_SIZE, 
                            (page-1) * PAGE_SIZE + PAGE_SIZE)                          // slice, get words from [0-250], page increases/decreases by 1
                        .join(' ')                                                     // join 250 words with space to make it a paragraph
                        .replaceAll("##", "\n\n")                                       
    const paragraphs = textInPages?.split("\n\n").map(p => p.trim())                   // split the formatted text in each page by \n\n and trim every paragraph in that page
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
    // ========= handle adding custom translation for word ======================
    function handleAddBtn(e) {
        const word = e.target.id
        setFormData({...formData, word: targetWord})
        setCustomForm(!showCustomForm)
    }

    const initialValues = {
        word: "",
        translation: ""
    }
    
    const [formData, setFormData] = useState(initialValues)
    
    function handleCustomWord(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }
    
    function handleCustomSubmit(e) {
        e.preventDefault()
        
        const newCustomWord = {
            word: formData.word,
            translation: formData.translation,
            user_id: user.id
        }

        fetch('/user_words', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newCustomWord)
        })
        // .then(res => res.json())
        // .then(newWord => {        
        //     console.log(newWord)
        //     setCustomWord(newWord)
        //     setCustomForm(!showCustomForm)
        //     setFormData(initialValues)
        // })
        .then(res => {
            if (res.ok) {
                res.json().then(newWord => {
                    setCustomWord(newWord)
                    setCustomForm(!showCustomForm)
                    setFormData(initialValues)
                })
            } else {
                if (res.status === 422) {
                    res.json().then(error => {
                        console.log(error)
                        setWordExistError(error)
                        
                    })
                }
                console.log(wordExistError)
                // window.alert("This word already exists in your word decks.")
                
            }
        })
    }

    // ========= Search word ====================================================
    function updateDictionaryWord(newWord) {
        setTargetWord(newWord.replace(/["'.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""))
        if (newWord === "") {
            setChosen(null)
            setAddBtn(false)
        }

        fetch(`/search/${newWord}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setCustomWord(data["custom"])
                    setChosen(data["dictionary"])
                    checkAvaliable(data)
                })
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

    function handleSearchChange(e) {
        const newWord = e.target.value 
        updateDictionaryWord(newWord)
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
                {paragraphs?.map(p => <ArticleParagraph words={p.split(" ")} onWordClicked={updateDictionaryWord} setWordExistError={setWordExistError}/>)}
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
                    value={targetWord}
                    onChange={handleSearchChange} 
                />

                <AddImage 
                    src={add_icon} 
                    alt="add translation for word button" 
                    onClick={handleAddBtn} 
                    id={targetWord}
                />

                {customWord === null && targetWord !== null && chosen?.length === 0 && (
                    <NotFound>
                        No results found for '{targetWord}'.
                    </NotFound>
                )}
                {showCustomForm && ( 
                    <CustomWordForm onSubmit={handleCustomSubmit}>
                        <Label>Hawaiian:
                            <br/>
                            <WordInput
                                required
                                disabled
                                type="text"
                                name="word"
                                value={formData.word}
                                // onChange={handleCustomWord}
                            />
                        </Label>
                        <br/>
                        <Label>Translation:
                            <br/>
                            <TranslationInput
                                required
                                type="text"
                                name="translation"
                                value={formData.translation}
                                onChange={handleCustomWord}
                            />
                            <br/>
                        </Label>
                        {wordExistError ? <ExistWarning>{wordExistError.message}</ExistWarning> : ""}
                        <br/>
                        <SaveButton type="submit" value="Save"/>
                    </CustomWordForm>
                )}
                <TranslationArea>
                    {customWord && (<CustomWord word={customWord.word} translation={customWord.translation }/>)}
                    {chosen?.map(word => <TranslationWord word={word.hawaiian} translation={word.translation }/>)}
                    
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


const ExistWarning = styled.span`
    color: red;
    font-size: 12px;
`

const SaveButton = styled.input`
    min-width: 235px !important;
    width: 0.1em; 
    height: 2em;
`

const TranslationInput = styled.input``

const WordInput = styled.input``

const Label = styled.label`
    font-size: 15px;
    font-weight: bold;
`

const CustomWordForm = styled.form`
    max-width: 265px;
    border: 1px solid #eee;
    margin-top: 35px;
    padding: 10px;

`

const NotFound = styled.div`
    margin: 45px 0;
    font-size: 25px;
`

const AddImage = styled.img`
    width: 25px;
    height: 25px;
    margin-left: 12px;
    cursor: pointer;
`

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
    max-width: 165px;
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