import styled from "styled-components"
import { useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../components/UserContext"
import { useState } from "react"


import { DeviceSize } from "../../responsive"
import { useMediaQuery } from "react-responsive"

import apiFetch from "../../api/ApiFetch"
import { ArticleCompleted } from "./ArticleCompleted"
import { DictionaryMobile } from "../dictionary-area/DictionaryMobile"
import { ArticleInfo } from "./ArticleInfo"
import { LeftSidebar } from "../sidebars/LeftSidebar"
import { RightSidebar } from "../sidebars/RightSidebar"
import { Disctionary } from "../dictionary-area/Distionary"
import { ArticleReadableArea } from "./ArticleReadableArea"

const PAGE_SIZE = 250;

export function Article() {

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const [isLoading, setLoading] = useState(false)

    const [showCustomForm, setCustomForm] = useState(false)
    const [wordExistError, setWordExistError] = useState(null)
    const [chosen, setChosen] = useState([])  // the first 5 words from dictionary_words
    const [customWord, setCustomWord] = useState(null)
    const [targetWord, setTargetWord] = useState(null)
    const [isDictionaryOpen, setDictionaryOpen] = useState(false)
    const [dictionaryWords, setDictionaryWords] = useState([])

    const [totalWords, setTotalWords] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [finishReading, setFinishReading] = useState(null)
    // const [haveReadPages, setReadPages] = useState(0)

    const [showInfo, setShowInfo] = useState(false)

    const [sentence, setSentence] = useState(null)

    const {
            article, setArticle, 
            user, 
            setErrors, splitText, calculatePages,
            vocabularies, setVocabularies
        } = useContext(UserContext)
    
    const { id } = useParams()
    useEffect(() => {
        setLoading(true)

        const timer = setTimeout(() => {
            apiFetch(`/articles/${id}`)
            .then(res => res.json())
            .then(data => {
                setCurrentPage(data.current_page)
                setArticle(data.article)
                setLoading(false)
            })
        }, 1000)
        return () => clearTimeout(timer)
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

    // scroll to the top of the page 
    const divRef = useRef(null)

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
        divRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function handleNextPage() {
        if (currentPage < pages - 1) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            updatePageInDB(nextPage)
            handleWordsRead(250)  
            setTotalWords(totalWords + 250)
        }
        divRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
    const initialValues = {
        word: "",
        translation: ""
    }
    
    const [formData, setFormData] = useState(initialValues)

    function handleAddBtn(e) {
        const word = e.target.id
        setFormData({...formData, word: word})
        setCustomForm(!showCustomForm)
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
            const updatedVocabs = vocabularies.filter((vocab) => vocab.hawaiian_clean.toLowerCase() !== clean_word.toLowerCase())
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
                    style={{"width": "100%", "position": "fixed", "height": "30%"}}
                    onClick={() => setDictionaryOpen(false)}
                    />
                )}

                <LeftSidebar handlePrevPage={handlePrevPage} leftArrow={leftArrow}/>
                
                <ArticleReadableArea 
                    currentPage={currentPage}
                    pages={pages}
                    paragraphs={paragraphs} 
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                    updateDictionaryWord={updateDictionaryWord}
                    setWordExistError={setWordExistError}
                    isLoading={isLoading}
                    divRef={divRef}
                    sentence={sentence}
                    setSentence={setSentence}
                />
                
                {!isMobile && (
                    <Disctionary 
                        chosen={chosen}
                        PostAndDelete={PostAndDelete} 
                        checkStatus={checkStatus}
                        handleSearchChange={handleSearchChange}
                        handleAddBtn={handleAddBtn}
                        targetWord={targetWord}
                        customWord={customWord} 
                        setCustomWord={setCustomWord}
                        formData={formData}
                        wordExistError={wordExistError}
                        showCustomForm={showCustomForm}
                        isDictionaryOpen={isDictionaryOpen}

                        initialValues={initialValues}
                        setFormData={setFormData}
                        setCustomForm={setCustomForm}
                        setWordExistError={setWordExistError}
                        sentence={sentence}
                    />
                )}
                
                {isMobile && isDictionaryOpen && (
                    <DictionaryMobile 
                        chosen={chosen}
                        PostAndDelete={PostAndDelete} 
                        checkStatus={checkStatus}
                        handleSearchChange={handleSearchChange}
                        handleAddBtn={handleAddBtn}
                        targetWord={targetWord}
                        customWord={customWord} 
                        setCustomWord={setCustomWord}
                        formData={formData}
                        wordExistError={wordExistError}
                        showCustomForm={showCustomForm}
                        isDictionaryOpen={isDictionaryOpen}
                        isMobile={isMobile}
                        setDictionaryOpen={setDictionaryOpen}
                        initialValues={initialValues}
                        setFormData={setFormData}
                        setCustomForm={setCustomForm}
                        setWordExistError={setWordExistError}
                        sentence={sentence}
                    />
                )}

                <RightSidebar 
                    handleNextPage={handleNextPage}
                    currentPage={currentPage}
                    pages={pages}
                    bgColor={bgColor}
                    handleFinishReading={handleFinishReading}
                />
            </ArticleContainer>
            {showInfo && (<ArticleInfo article={article} setShowInfo={setShowInfo} showInfo={showInfo}/>)}
            {finishReading && (<ArticleCompleted totalWords={totalWords}/>)}
            
        </>
    )
}

const ArticleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 1px;
    margin: 60px auto 0;
    box-sizing: border-box;
    width: 100%;
    min-height: 450px;
    font-size: 20px;
    line-height: 1.6;
    height: calc(100% - 60px);  // Handle top bar which is 60px
    position: fixed;
`