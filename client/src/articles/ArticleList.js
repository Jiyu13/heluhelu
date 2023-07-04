import {Link} from "react-router-dom";
import styled from "styled-components"

import edit_icon from "../assets/images/edit_icon.svg"
import delete_icon from "../assets/images/delete_icon.svg"
import share_icon from "../assets/images/share_icon.svg"
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import apiFetch from "../api/ApiFetch";
import { ProgressBar } from "./progress-bar/ProgressBar";
import { WordMarkedInfo } from "./vocab-stats/WordMarkedInfo";



export function ArticleList( {articles, onDeleteArticle} ) {

    const { user, splitText, calculatePages } = useContext(UserContext)

    function handleDelete(e) {
        const article_id = parseInt(e.target.id)
        apiFetch(`/article/${article_id}`, {
            method: "DELETE",
        })
        .then(() => {
            onDeleteArticle(article_id)})
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
        {articles?.length ?  
        <ArticlesListTable>
            <tbody>
            {articles.map(a =>
                <tr key={a.id}>
                    <ArticleTitleCell>  

                        <ArticleTitle>
                            <Link 
                                to={`/articles/${a.id}`} 
                                style={{textDecoration: 'none', color: "rgb(41, 42, 46)", fontSize: "1.3rem", fontWeight: "700"}} 
                                id={a.id}
                            >
                                {a.title} 
                            </Link>
                            <br/>
                            {/* ============== progress bar + vocab stats ========================= */}
                            <ProgressBar article={a} getCurrentPage={getCurrentPage}/>
                            <WordMarkedInfo article={a}/>
                            {/* ============== progress bar + vocab stats  ========================= */}
                        </ArticleTitle>
                    </ArticleTitleCell>

                    <EditCell>
                        <EditContainer>
                            <Button >
                                <Link to={`/article/edit/${a.id}`} style={{"color": "inherit"}}>
                                    <ButtonImage src={edit_icon} alt="edit icon"/>
                                </Link>
                            </Button>
                            <Button >
                                <ButtonImage src={delete_icon} alt="delete icon" id={a.id} onClick={handleDelete}/>
                            </Button>

                            <Button>
                                <Link to={`/article/share/${a.id}`}>
                                    <ButtonImage src={share_icon} alt="share icon"/>
                                </Link>
                                
                            </Button>

                        </EditContainer>

                    </EditCell>
                </tr>
                
            )}

            </tbody>

        </ArticlesListTable>
        : <h2>You don't have any articles.</h2> }

    </ArticlesListContainer> 
    )
}

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
    // vertical-align: top;
    border: 3px solid rgb(227, 231, 239);
    border-radius: 1.25rem;
`
const ArticleTitle = styled.div`
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 21px;
    text-align: left;
    vertical-align: top;
    // text-decoration: none;
    // color: #ccc;
    // display: block;
    // margin-bottom: 10px;
`

const EditCell = styled.td`
    vertical-align: top;
    width: 100px;
    border-radius: 8px;
`

const EditContainer = styled.div`
    margin-top: 4px;
    text-align: right;
    width: 100px;
    font-size: 20px;
    line-height: 1.6;
`

const Button = styled.a`
    background-color: grey;
    z-index: 100;
    display: inline-block;
    position: relative;
    top: -2px;
    vertical-align: top;
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 3px;
    text-align: center;
    margin-bottom: 4px;
    margin-right: 4px;
    user-select: none; // Don't allow user to select text in buttons

    &:hover {
        background: #575757;
    }
`

const ButtonImage = styled.img`
    width: 28px;
    height: 28px;
    opacity: 0.5;
    padding: 0;
    margin: 3px 0 0 0;
    overflow-clip-margin: content-box;
    overflow: clip;
`

