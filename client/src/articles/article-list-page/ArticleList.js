import {Link} from "react-router-dom";
import styled from "styled-components"
import { useContext } from "react";


import edit_icon from "../../assets/images/black/edit_black_icon.svg"
import edit_white_48dp from "../../assets/images/white/edit_white_48dp.svg"
import delete_icon from "../../assets/images/delete_icon.svg"
import delete_white_48dp from "../../assets/images/white/delete_white_48dp.svg"
import share_icon from "../../assets/images/share_icon.svg"
import share_white_48dp from "../../assets/images/white/share_white_48dp.svg"
import info_black_48dp from "../../assets/images/black/info_black_48dp.svg"
import info_white_48dp from "../../assets/images/white/analytics_white_48dp.svg"

import { UserContext } from "../../components/UserContext";
import { ProgressBar } from "../progress-bar/ProgressBar";
// import { WordMarkedInfo } from "./vocab-stats/WordMarkedInfo";



export function ArticleList( {articles, setDeletePopup, setArticleID} ) {

    const { user, splitText, calculatePages, isDark } = useContext(UserContext)

    function handleShowDeletePopup(e) {
        setDeletePopup(true)
        setArticleID(e.target.id)
    }
    
    // ============== check how many pages has been read ==============
    function getCurrentPage(article) {
        const words = splitText(article)
        const total_pages = calculatePages(words)
        // eslint-disable-next-line
        const currentUserArticle = articles.filter(a => {
            if (a && a.user_id === user?.id) {
                return a
            }
        })
        
        if (currentUserArticle.length === 0) {
            const newAddedUserArticle = articles.filter(u_r => u_r.user_id===user.id && u_r.article_id===article.id)
            const curr_page = newAddedUserArticle[0]["current_page"]
            const total_pages = Math.ceil(splitText(article).length/250)

            if (curr_page === total_pages) {
                return (parseInt(newAddedUserArticle[0]["current_page"]) + 1) / total_pages
            }

            return parseInt(newAddedUserArticle[0]["current_page"]) / total_pages
        }
        return parseInt(currentUserArticle[0]["current_page"]) / total_pages
    }


    return (
    <ArticlesListContainer>
        {articles?.length > 0 && (  
        <ArticlesListTable>
            <tbody>
            {articles?.map(a =>
                <tr key={a.id}>
                    <ArticleTitleCell>  

                        <ArticleTitle>
                            <Link 
                                to={`/articles/${a.id}`} 
                                style={{
                                    textDecoration: 'none',
                                    color: "inherit",
                                    fontSize: "1.3rem",
                                    fontWeight: "700"
                                }} 
                                id={a.id}
                            >
                                {a.title} 
                            </Link>
                            <br/>
                            {/* ============== progress bar + vocab stats ========================= */}
                            <ProgressBar article={a} getCurrentPage={getCurrentPage}/>
                            {/* <WordMarkedInfo article={a}/> */}
                            {/* ============== progress bar + vocab stats  ========================= */}
                        </ArticleTitle>
                    </ArticleTitleCell>

                    <EditCell>
                        <EditContainer>
                            <Button className="article-settings-btn">
                                <Link to={`/article/edit/${a.id}`} style={{"color": "inherit"}}>
                                    <ButtonImage 
                                        src={isDark === true ? edit_white_48dp : edit_icon} 
                                        alt="edit icon"
                                    />
                                </Link>
                            </Button>

                            <Button className="article-settings-btn">
                                <Link to={`/article/word_stats/${a.id}/${a.title}`}>
                                    <ButtonImage 
                                        src={isDark === true ? info_white_48dp : info_black_48dp} 
                                        alt="article info icon"
                                    />
                                </Link>
                            </Button>

                            <Button className="article-settings-btn">
                                <ButtonImage 
                                    src={isDark === true ? delete_white_48dp : delete_icon} 
                                    alt="delete icon" 
                                    id={a.id} 
                                    onClick={handleShowDeletePopup}
                                />
                            </Button>

                            <Button className="article-settings-btn">
                                <Link to={`/article/share/${a.id}`}>
                                    <ButtonImage 
                                        src={isDark === true ? share_white_48dp : share_icon} 
                                        alt="share icon"
                                    />
                                </Link>
                                
                            </Button>
                            

                        </EditContainer>

                    </EditCell>
                </tr>
                
            )}

            </tbody>

        </ArticlesListTable>
        )}

        {articles?.length === 0 && (<h2>You don't have any articles.</h2>)}

    </ArticlesListContainer> 
    
)}

const ArticlesListContainer = styled.div`
    margin: 45px auto 0;
    max-width: 750px;
    text-align: center;
    font-size: 20px;
    line-height: 1.6;
`

const ArticlesListTable = styled.table`
    width: 100%;
    max-width: 750px;
    display: table;
    box-sizing: border-box;
    text-align: center;
    // margin: 0 auto;
    // border-color: gray;
`

const ArticleTitleCell = styled.td`
    border: 3px solid rgb(227, 231, 239);
    border-radius: 1.25rem;
`
const ArticleTitle = styled.div`
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 21px;
    text-align: left;
    vertical-align: top;
`

const EditCell = styled.td`

    width: 100px;
    border-radius: 8px;
`

const EditContainer = styled.div`
    text-align: right;
    width: 100px;
    font-size: 20px;
    line-height: 1.6;
`

const Button = styled.button`
    // background-color: inherit;
    background-color: #d1d8e0;
    display: inline-block;
    position: relative;
    vertical-align: top;
    width: 40px;
    height: 40px;
    padding: 4px;
    border-radius: 3px;
    border: none;
    text-align: center;
    margin-bottom: 4px;
    margin-right: 4px;
    user-select: none; // Don't allow user to select text in buttons

    &:hover {
        background: #a5b1c2;
        // #57606f
    }
`

const ButtonImage = styled.img`
    width: 28px;
    height: 28px;
    opacity: 0.5;
    margin: 2px 0;
    overflow-clip-margin: content-box;
    overflow: clip;
`

