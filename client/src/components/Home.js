import styled from "styled-components";
import { ArticleList } from "../articles/article-list-page/ArticleList";

import import_icon from "../assets/images/white/note_add_white_24dp.svg"
import { Link } from "react-router-dom";
import { ButtonElements } from "../styles/Buttons";
import { DeleteConfirmation } from "../articles/article-list-page/DeleteConfirmation";
import { useContext, useState } from "react";
import { useEffect } from "react";
import apiFetch from "../api/ApiFetch";

import { SkeletonHomePage } from "../skeleton-screens/SkeletonHomePage";
import { UserContext } from "./UserContext";
import { PageContainer } from "../styles/Container";


export function Home({ articles, setArticles, onDeleteArticle}) {

    const [isLoading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    
    // ====================== handle click delete btn " Yes" =======================
    const [showDeletePopup, setDeletePopup] = useState(false)
    const [articleID, setArticleID] = useState(null)

    // ========= get all articles of current user =================================
    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            try {
                const response = await apiFetch('/articles')
                const data = await response.json()
                setArticles(data)
                setLoading(false)
            } catch (error) {
                console.log("Error fetching data", error)
            } 
        }
        fetchData()

    }, [setArticles])

    
    return (
        <PageContainer className="page-container">  
            {user && (
                <>  
                    {showDeletePopup && ( 
                        <DeleteConfirmation 
                            articleID={articleID}
                            setDeletePopup={setDeletePopup}
                            onDeleteArticle={onDeleteArticle}
                        />
                    )} 

                    <HomepageTitle>Heluhelu</HomepageTitle>
                    <HomepageText>Load your Hawaiian texts and get started reading! Click on words you don't know to see their definitions and keep track of your vocabulary as you read!</HomepageText>

                    <HomepageButtonContainer>
                        <Link to={"/import/text"}>
                            <ImportButton value="Import">
                                <ButtonSpan>
                                    <img src={import_icon} alt="import new content"/>
                                </ButtonSpan>
                                <ButtonSpan>Import</ButtonSpan>
                            </ImportButton>
                        </Link>
                    </HomepageButtonContainer>
                    {isLoading && <SkeletonHomePage/>}
                    {!isLoading && ( <ArticleList 
                        articles={articles}
                        setDeletePopup={setDeletePopup}
                        setArticleID={setArticleID}
                    />
                    )}
                </>
            )}
        </PageContainer>
    ) 
}

// ------------------import btn---------------------------
const ImportButton = styled(ButtonElements)`
    margin-top: 12px;
    padding: 8px;
    width: 130px;
    font-size: 1.2rem;
`

const ButtonSpan = styled.span`
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    &:first-child {
        padding-right: 4px;
    }
`

const HomepageTitle = styled.h1`
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`

const HomepageText = styled.div`
    max-width: 700px;
    text-align: center;
    margin: 18px auto 18px auto;
    font-size: 14px;
    color: #999!important;
    line-height: 1.6;
    display: block;
    font-family: readex pro,arial,sans-serif;
`

const HomepageButtonContainer = styled.div`
    display: block;
    text-align: center;
`
// const PageContainer = styled.div`
//     padding-top: 90px;
//     text-align: center;
// `