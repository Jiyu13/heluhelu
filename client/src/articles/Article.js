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

import { DeviceSize } from "../responsive"
import { useMediaQuery } from "react-responsive"
import { DictionaryMobile } from "./dictionary-area/DictionaryMobile"


const PAGE_SIZE = 250;

export function Article() {

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    const [showAddBtn, setAddBtn] = useState(false)
    const [showCustomForm, setCustomForm] = useState(false)
    const [wordExistError, setWordExistError] = useState(null)
    const [customWord, setCustomWord] = useState(null)
    const [targetWord, setTargetWord] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    const [isDictionaryOpen, setDictionaryOpen] = useState(false)

    const {article, setArticle, 
           articles, setArticles, 
           user, chosen, setChosen, 
           setErrors, splitText, calculatePages
        } = useContext(UserContext)
    
    const { id } = useParams()
    useEffect(() => {
        fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setCurrentPage(data.current_page)
            setArticle(data.article)
            setArticles([data.article, ...articles])
        })
    }, [id]) // [id] eslint-disable-next-line

    // ==========================================================================
    const articleWords = splitText(article)
    const pages = calculatePages(articleWords)

    // ==========================================================================
    const textInPages = articleWords?.slice(
                            (currentPage) * PAGE_SIZE, 
                            (currentPage) * PAGE_SIZE + PAGE_SIZE)                     // slice, get words from [0-250], page increases/decreases by 1
                        .join(' ')                                                     // join 250 words with space to make it a paragraph
                        .replaceAll("##", "\n\n")                                       
    const paragraphs = textInPages?.split("\n\n").map(p => p.trim())                   // split the formatted text in each page by \n\n and trim every paragraph in that page
    // ==========================================================================
    // console.log("cur page " + currentPage)

    // ===== handle show next/prev page container & update current_page =========
    function handlePrevPage() {
        console.log("current", currentPage)
        
        const prevPage = Math.max(currentPage - 1, 0)
        setCurrentPage(prevPage)
        updatePageInDB(prevPage)
    }

    function handleNextPage() {
        const nextPage = Math.min(currentPage + 1, pages - 1)
        updatePageInDB(nextPage)
        setCurrentPage(nextPage)


        let words_read
        if (currentPage < pages - 1) {
            words_read = 250
        } else if (currentPage === pages - 1) {
            words_read = articleWords?.length - (pages - 1)*250
        }

        console.log(currentPage, nextPage, pages, words_read)

        fetch('/stats', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: user.id,
                words_read: words_read,
            }) 
        })
    }

    function updatePageInDB(curr_page) {
        console.log("handleCurrentPage", curr_page)
        fetch(`/user_article/${article.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: user.id,
                article_id: article.id,
                current_page: curr_page,
            })
        })
    }
    // ========= check word avaliability ========================
    function checkCanAddTranslation(word) {
        if (word.length === 0) {
            setAddBtn(true)
        } else {
            setAddBtn(false)
            handleCancel()
        }
    }

    // ========= handle adding custom translation for word ======================
    function handleAddBtn(e) {
        const word = e.target.id
        // console.log(word)
        // console.log(targetWord)
        setFormData({...formData, word: word})
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
                        setWordExistError(error)
                    })
                }
                
            }
        })
    }
    console.log("isopen = " + isDictionaryOpen)

    // ========= Search word ====================================================
    function updateDictionaryWord(newWord) {
        console.log(newWord)
        setDictionaryOpen(true)
        
        setTargetWord(newWord.replace(/["'.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""))  //eslint-disable-line
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
                    checkCanAddTranslation(data)
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

    function handleCancel() {
        setCustomForm(false)
        setFormData(initialValues)
    }
    
    return (
        <>
        <ArticleContainer>

            {isDictionaryOpen && (
                <a class="asdf" href="#"
                style={{"width": "100%", "position": "fixed", "height": "50%"}}
                 onClick={function(){if(isDictionaryOpen) {setDictionaryOpen(false)}}}></a>
            )}

            <SideBar onClick={handlePrevPage}>
                <SideBarImage>
                    <img src={left_arrow_icon} alt="left arrow icon"/>
                </SideBarImage>
            </SideBar>
           
            <ReadableArea>
                <PagesContainer>
                    <BookIcon><img src={book_material_icon} alt="book icon"/></BookIcon>
                    <PageDisplay>pg: {currentPage + 1} of {pages}</PageDisplay>
                </PagesContainer>
                <ReadableContent>
                {paragraphs?.map(p => <ArticleParagraph words={p.split(" ")} onWordClicked={updateDictionaryWord} setWordExistError={setWordExistError}/>)}
                </ReadableContent>
            </ReadableArea>
            
            {!isMobile && (
            <DictionaryArea>
                <span style={{"font-size":"12px"}}>Total words: {articleWords?.length}</span>
                <br/>
                <PagesContainer>
                    <BookIcon><img src={book_material_icon} alt="book icon"/></BookIcon>
                    <PageDisplay>pg: {currentPage + 1} of {pages}</PageDisplay>
                </PagesContainer>

                <SearchArea 
                    type="text"
                    value={targetWord}
                    onChange={handleSearchChange} 
                />

                {customWord ? "" :
                    <AddImage 
                        src={add_icon} 
                        alt="add translation for word button" 
                        onClick={handleAddBtn} 
                        id={targetWord}
                    />
                }

                {customWord === null && targetWord !== null && chosen?.length === 0 && (
                    <NotFound>
                        No results found for '{targetWord}'.
                    </NotFound>
                )}
                {showCustomForm && ( 
                    <CustomForm onSubmit={handleCustomSubmit}>
                        <Label>Hawaiian:
                            <br/>
                            <WordInput
                                required
                                disabled
                                type="text"
                                name="word"
                                value={formData.word}
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
                        <SaveButton type="submit" value="Save" style={{"background-color": "rgb(8, 61, 116)", "color": "white"}}/>
                        <CancelButton type="button" value="Cancel" onClick={handleCancel}/>
                    </CustomForm>
                )}
                <TranslationArea>
                    {customWord && (<CustomWord key={customWord.id} word={customWord} setCustomWord={setCustomWord}/>)}
                    {chosen?.map(word => <TranslationWord word={word.hawaiian} translation={word.translation }/>)}
                    
                </TranslationArea>
            </DictionaryArea>
            )}
            
            <SideBar onClick={handleNextPage}>
                <SideBarImage>
                    <img src={right_arrow_icon} alt="right arrow icon"/>
                </SideBarImage>
            </SideBar>
        </ArticleContainer>

        {isMobile && isDictionaryOpen && (
            <DictionaryMobile 
                handleSearchChange={handleSearchChange}
                handleAddBtn={handleAddBtn}
                handleCustomSubmit={handleCustomSubmit}
                handleCustomWord={handleCustomWord}
                handleCancel={handleCancel}
                articleWords={articleWords}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                targetWord={targetWord}
                setTargetWord={setTargetWord}
                customWord={customWord} 
                setCustomWord={setCustomWord}
                initialValues={initialValues}
                formData={formData}
                setFormData={setFormData}
                wordExistError={wordExistError}
                pages={pages}
                showCustomForm={showCustomForm}

            />
        )}
        </>
    )
}


const ExistWarning = styled.span`
    color: red;
    font-size: 12px;
`

const CancelButton = styled.input`
    width: 90%;
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    height: 2em;
    margin-right: 15px;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
`

const SaveButton = styled.input`
    width: 90%;
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    height: 2em;
    margin-right: 15px;
    border: 0;
`

const TranslationInput = styled.input`
    width: 90%;
    max-width: 235px;
`

const WordInput = styled.input`
    width: 90%;
    max-width: 235px;   
`

const Label = styled.label`
    font-size: 15px;
    font-weight: bold;
`

const CustomForm = styled.form`
    border: 1px solid #eee;
    margin-top: 35px;
    padding: 10px;
    text-align: center;
`

const NotFound = styled.div`
    margin: 45px 0;
    font-size: 25px;
`

const AddImage = styled.img`
    width: 25px;
    height: 25px;
    margin-left: 6px;
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
    max-width: 300px;
    flex-basis: 25%;
    box-sizing: border-box;
    padding: 0 12px 12px 12px;
    line-height: 1.6;

    overflow: auto;
`

const SearchArea = styled.input`
    width: 90%;
    border-radius: 8px;
    height: 20px;
    font-size: 25px;
    max-width: 150px;
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