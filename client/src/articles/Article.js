import styled from "styled-components"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../components/UserContext"

import book_material_icon from "../assets/images/book_material_icon.svg"
import left_arrow_icon from "../assets/images/arrowleft.svg"
import right_arrow_icon from "../assets/images/arrowright.svg"
import add_icon from "../assets/images/add_icon.svg"
import finish_reading_icon from "../assets/images/finish_reading_icon.svg"



import { ArticleParagraph } from "./ArticleParagraph"
import { TranslationWord } from "./TranslationWord";
import { useState } from "react"
import { CustomWord } from "./CustomWord"

import { DeviceSize } from "../responsive"
import { useMediaQuery } from "react-responsive"
import { DictionaryMobile } from "./dictionary-area/DictionaryMobile"
import { WordTracker } from "./dictionary-area/WordTracker";
import apiFetch from "../api/ApiFetch"
import { ArticleCompleted } from "./ArticleCompleted"
import { DropDown } from "../components/DropDown"


import { ButtonButtons, SubmitButtons } from "../components/Buttons"

const PAGE_SIZE = 250;

export function Article() {

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    const [showCustomForm, setCustomForm] = useState(false)
    const [wordExistError, setWordExistError] = useState(null)
    const [customWord, setCustomWord] = useState(null)
    const [targetWord, setTargetWord] = useState(null)
    const [isDictionaryOpen, setDictionaryOpen] = useState(false)
    const [dictionaryWords, setDictionaryWords] = useState([])

    const [totalWords, setTotalWords] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [finishReading, setFinishReading] = useState(null)
    // const [haveReadPages, setReadPages] = useState(0)

    const {
            article, setArticle,
            user, chosen, setChosen, 
            setErrors, splitText, calculatePages,
            vocabularies, setVocabularies
        } = useContext(UserContext)
    
    const { id } = useParams()
    useEffect(() => {
        apiFetch(`/articles/${id}`)
        .then(res => res.json())
        .then(data => {
            setCurrentPage(data.current_page)
            setArticle(data.article)
        })
        // eslint-disable-next-line
    }, [id]) 

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

    // ===== handle show next/prev page container & update current_page =========
    const leftArrow = currentPage === 0 ? "hidden" : "visible"

    function handlePrevPage() {
        if (currentPage > 0){
            const prevPage = currentPage - 1
            setCurrentPage(prevPage)
            updatePageInDB(prevPage)
        } 
        else if (currentPage === 0) {
             setCurrentPage(0)
             updatePageInDB(0)
        }
        setFinishReading(false)

        if (totalWords >= currentPage*250){
            setTotalWords(totalWords - 250)
        }
    }
    

    function handleNextPage() {
        if (currentPage < pages - 1) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            updatePageInDB(nextPage)
            handleWordsRead(250)  
            setTotalWords(totalWords + 250)
        }
    }

    function handleWordsRead(wordsRead) {

        apiFetch('/stats', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: user.id,
                words_read: wordsRead,
            }) 
        })
    }


    // ????????????????????????????
    function handleFinishReading() {
        if ( article.check_finished !== true ) {
            apiFetch(`/article/${article.id}/check_finish`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: user.id,
                    article_id: article.id,
                    check_finished: 1,
                })
            })
        }
        const lastPageWords = articleWords?.length - (pages - 1)*250
        handleWordsRead(lastPageWords)
        setTotalWords(totalWords + lastPageWords)
        setFinishReading(true)
    }

    function updatePageInDB(page) {
        apiFetch(`/article/${article.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: user.id,
                article_id: article.id,
                current_page: page,
            })
        })
    }


    // ========= handle adding custom translation for word ======================
    function handleAddBtn(e) {
        const word = e.target.id
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

        apiFetch('/user_words', {
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

    // ========= Search word ====================================================
    function updateDictionaryWord(newWord) {
        setDictionaryOpen(true)
        const cleanWord = newWord.replace("'", "ʻ").replace(/[^a-zA-Zā-ūĀ-Ūʻ ]+/g, "")
        setTargetWord(cleanWord)
        if (cleanWord === "") {
            setChosen(null)
        }
        else {
            apiFetch(`/search/${cleanWord}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setCustomWord(data["custom"])
                        setChosen(data["dictionary"])
                        setDictionaryWords(data.dictionary)
                    })
                } else {
                    res.json().then(err => setErrors(err.errors))
                }
            })
        }
    }

    function handleSearchChange(e) {
        const newWord = e.target.value
        updateDictionaryWord(newWord)
    }

    function handleCancel() {
        setCustomForm(false)
        setFormData(initialValues)
    }

    function PostAndDelete(word, wordStatus) {
        // remove punctuations
        let clean_word = word.replace(/[^a-zA-Zā-ūĀ-Ūʻ ]+/g, "")
        
        const filter_word = dictionaryWords.filter(d_w => d_w["hawaiian_clean"].toLowerCase() === clean_word.toLowerCase())
        if (filter_word.length) {
            clean_word = filter_word[0]["hawaiian_clean"]
        } 
        const vocab= {
            user_id: user.id,
            hawaiian_clean: clean_word,
            status: wordStatus
        }

        apiFetch(`/vocabulary/${clean_word}/${wordStatus}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(vocab)
        })
        .then(res => res.json())
        .then(data => {
            const updatedVocabs = vocabularies.filter((vocab) => vocab.hawaiian_clean !== clean_word)
            if (!data.deleted) {
                updatedVocabs.push(data)
            }
            setVocabularies(updatedVocabs)
        })
    }

    // toggle btn stylings
    function checkStatus(word) {
        let result = vocabularies?.filter(vocab => 
            vocab.hawaiian_clean.toLowerCase() === word.toLowerCase()
        )

        if (result.length !== 0) {
            const statusNumber = result[0]["status"]
            return statusNumber
        } else {
            return 0
        }
    }

    const bgColor = article?.check_finished ? "#A1C181" : ""
    return (
        <>
            <ArticleContainer>

                {isMobile && isDictionaryOpen && (
                    /* eslint-disable jsx-a11y/anchor-is-valid */
                    /* eslint-disable jsx-a11y/anchor-has-content */

                    <a href="#"
                    style={{"width": "100%", "position": "fixed", "height": "55%"}}
                    onClick={() => setDictionaryOpen(false)}
                    />
                )}

                <SideBar onClick={handlePrevPage} style={{visibility: leftArrow}}>
                    <SideBarImage>
                        <img src={left_arrow_icon} alt="left arrow icon"/>
                    </SideBarImage>
                </SideBar>
            
                <ReadableArea>
                    <header>
                        <DropDown/>
                    </header>
                    
                    <ReadableContent>
                    {paragraphs?.map((p, index) => 
                        <ArticleParagraph 
                            key={index} 
                            words={p.split(" ")} 
                            onWordClicked={updateDictionaryWord} 
                            setWordExistError={setWordExistError}
                        />
                    )}
                    </ReadableContent>
                </ReadableArea>
                
                {!isMobile && (
                <DictionaryArea>
                    <span style={{fontSize:"12px"}}>Total words: {articleWords?.length}</span>
                    <br/>
                    <PagesContainer>
                        <BookIcon><img src={book_material_icon} alt="book icon"/></BookIcon>
                        <PageDisplay>pg: {currentPage+1} of {pages}</PageDisplay>
                    </PagesContainer>

                    <SearchArea 
                        type="text"
                        value={targetWord}
                        onChange={handleSearchChange}
                    />

                    {customWord ? "" :
                        <AddImage 
                            src={add_icon} 
                            alt="add custom word button" 
                            onClick={handleAddBtn} 
                            id={targetWord}
                        />
                    }

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
                            <SaveButton type="submit" value="Save" style={{backgroundColor: "rgb(8, 61, 116)", "color": "white"}}/>
                            <CancelButton type="button" value="Cancel" onClick={handleCancel}/>
                        </CustomForm>
                    )}
                    <br/>
                    {/* {isDictionaryOpen && chosen && dictionaryWords.length !== 0 &&( */}
                    {isDictionaryOpen && chosen &&(
                        <WordTracker
                            target={targetWord} 
                            word={chosen} 
                            PostAndDelete={PostAndDelete} 
                            checkStatus={checkStatus}
                        />
                    )}

                    {customWord === null && targetWord !== null && chosen?.length === 0 && (
                        <>
                            <NotFound>
                                No results found for '{targetWord}'.
                            </NotFound>
                        </>
                        
                    )}

                    <TranslationArea>
                        
                        {customWord && (
                            <CustomWord 
                                key={customWord.id} 
                                word={customWord} 
                                setCustomWord={setCustomWord} 
                                PostAndDelete={PostAndDelete} 
                                checkStatus={checkStatus}
                            />
                        )}
                        {chosen?.map((word, index) => 
                            <TranslationWord 
                                key={word.id} 
                                word={word.hawaiian} 
                                translation={word.translation} 
                                hawaiian_clean={word.hawaiian_clean}
                                PostAndDelete={PostAndDelete}
                                checkStatus={checkStatus}
                            />
                        )}
                        
                    </TranslationArea>
                </DictionaryArea>
                )}
                
                {isMobile && isDictionaryOpen && (
                    <DictionaryMobile 
                        PostAndDelete={PostAndDelete} checkStatus={checkStatus}
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
                        isDictionaryOpen={isDictionaryOpen}
                    />
                )}

                {currentPage === pages - 1 ?  
                    <SideBar onClick={handleFinishReading} >
                        <SideBarImage>
                            <FinishReadingImg 
                                src={finish_reading_icon} 
                                alt="finish reading icon"
                                style={{backgroundColor: bgColor}}
                            />
                        </SideBarImage>
                    </SideBar>
                    :
                    <SideBar onClick={handleNextPage} >
                        <SideBarImage>
                            <img 
                                src={right_arrow_icon} 
                                alt="right arrow icon"
                            />
                        </SideBarImage>
                    </SideBar>    
                }
            </ArticleContainer>
            {finishReading && (<ArticleCompleted totolWords={totalWords}/>)}
            
        </>
    )
}

const FinishReadingImg = styled.img`
    border-radius: 50%;
    &:hover {
        background-color: #A1C181;
    }
`

const ExistWarning = styled.span`
    color: red;
    font-size: 12px;
`

const CancelButton = styled(ButtonButtons)`
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    margin-top: 0px;
    padding: 6px 4px;
`

const SaveButton = styled(SubmitButtons)`
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    margin-top: 0px;
    padding: 6px 4px;
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
    display: block;
    max-width: 725px;
    width: 100%;
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
    min-width: 250px;
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