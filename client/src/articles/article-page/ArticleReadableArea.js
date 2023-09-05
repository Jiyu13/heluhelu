import styled from "styled-components"

import book_material_icon_white from "../../assets/images/white/book_material_icon_white.svg"
import { DropDown } from "./DropDown"
import { ArticleParagraph } from "./ArticleParagraph"
import { useContext } from "react"
import { UserContext } from "../../components/UserContext"

import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonArticlePage } from "../../skeleton-screens/SkeletonArticlePage"



export function ArticleReadableArea({
    currentPage, pages, paragraphs, 
    showInfo, setShowInfo,
    updateDictionaryWord, setWordExistError,
    isLoading,
    divRef,
    setSentence
    }) {

    const {article} = useContext(UserContext)
    return (
        <ReadableArea ref={divRef}>
            {isLoading && (
                <SkeletonArticlePage/>

            )}
            {!isLoading && (
                <>
                    <HeaderContainer>
                        <PagesContainer>
                            <BookIcon><img src={book_material_icon_white} alt="book icon"/></BookIcon>
                            <PageDisplay>pg: {currentPage+1} / {pages}</PageDisplay>
                        </PagesContainer>
                        <DropDown article={article} showInfo={showInfo} setShowInfo={setShowInfo}/>
                    </HeaderContainer>
                
                    <ReadableContent>
                    {paragraphs?.map((p, index) => 
                        <ArticleParagraph 
                            key={index} 
                            words={p.split(" ")} 
                            updateDictionaryWord={updateDictionaryWord} 
                            setWordExistError={setWordExistError}
                            setSentence={setSentence}
                        />
                    )}
                    </ReadableContent>
                </>
            )}
        </ReadableArea>
    )
}

const ReadableContent = styled.div`
    font-size: 20px;
    line-height: 1.6;
    padding: 0 8px 8px;
`

const PageDisplay = styled.div`
    font-size: 15px;
    line-weight: 1;
    display: inline-block;
    vertical-align: top;
    margin-left: 8px;
`

const BookIcon = styled.div`
    display: inline-block;
    vertical-align: top;
    height: 20px;
`

const PagesContainer = styled.div`
    margin-left: 8px;
    display: flex;
    align-items: center;
`

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 6px;
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