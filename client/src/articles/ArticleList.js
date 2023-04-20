import {Link} from "react-router-dom";
import styled from "styled-components"

import edit_icon from "../assets/images/edit_icon.svg"
import delete_icon from "../assets/images/delete_icon.svg"
import share_icon from "../assets/images/share_icon.svg"
import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";



export function ArticleList( {articles, onDeleteArticle} ) {

    const {user, userArticles, splitText, calculatePages} = useContext(UserContext)
    

    function handleDelete(e) {
        const article_id = parseInt(e.target.id)
        fetch(`/user_article/${article_id}`, {
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
        // console.log(article) // shared article will not be shown in user_articles at this moment
        const userArticle = article?.user_articles?.filter(u_r => {
            if (u_r && u_r.user_id === user?.id) {
                return u_r
            }
        })
        
        if (userArticle.length === 0) {
            const newAddedUserArticle = userArticles.filter(u_r => u_r.user_id===user.id && u_r.article_id===article.id)
            const curr_page = newAddedUserArticle[0]["current_page"]
            const total_pages = Math.ceil(splitText(article).length/250)

            if (curr_page === total_pages) {
                return (parseInt(newAddedUserArticle[0]["current_page"]) + 1) / total_pages
            }

            return parseInt(newAddedUserArticle[0]["current_page"]) / total_pages
        }
        return parseInt(userArticle[0]["current_page"]) / total_pages
        
        // if (userArticle[0]["current_page"] < total_pages && finishReading === false) {
        //     setFinish(!finishReading)
        //     return parseInt(userArticle[0]["current_page"]) / total_pages
        // } else if (userArticle[0]["current_page"] < total_pages && finishReading) {
        //     console.log(userArticle[0]["current_page"], finishReading)
        //     return (parseInt(userArticle[0]["current_page"]) + 1 )/ total_pages
        // }
    }
    // ===============================================================
    const [finishReading, setFinish] = useState(false)

    return (
    <ArticlesListContainer>
        {articles.length ?  
        <ArticlesListTable>
            <tbody>
            {articles.map(article =>
                <tr key={article.id}>
                    <ArticleTitleCell>  

                        <ArticleTitle>
                            <Link to={`/articles/${article.id}`} style={{textDecoration: 'none'}} id={article.id}>
                                {article.title}
                            </Link>
                            <br/>
                            {/* ============== process bar ========================= */}
                            <CompletionBar>
                                <CompletionBarProgress style={{width: `${getCurrentPage(article) * 100 }%`}}/>
                            </CompletionBar>
                            <CompletionText>
                                {calculatePages(splitText(article))} pgs
                            </CompletionText>
                            {/* ============== process bar ========================= */}
                    

                        </ArticleTitle>

                        
                    </ArticleTitleCell>

                    <EditCell>
                        <EditContainer>
                            <Button >
                                <Link to={`/article/edit/${article.id}`} style={{"color": "inherit"}}>
                                    <ButtonImage src={edit_icon} alt="edit icon"/>
                                </Link>
                                
                            </Button>
                            <Button >
                                <ButtonImage src={delete_icon} alt="delete icon" id={article.id} onClick={handleDelete}/>
                            </Button>

                            <Button>
                                <Link to={`/article/share/${article.id}`}>
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
    margin: 0 auto;
    margin-top: 72px;
    max-width: 750px;
    text-align: center;
    font-size: 20px;
    line-height: 1.6;
`

const ArticlesListTable = styled.table`
    width: 100%;
    box-sizing: border-box;
    max-width: 750px;
    margin: 0 auto;
    display: table;
    box-sizing: border-box;
    border-color: gray;
    text-align: center;
`

const ArticleTitleCell = styled.td`
    vertical-align: top;
    background: grey;
    border-radius: 8px;

    &:hover {
        background: #575757;
    }
`
const ArticleTitle = styled.div`
    // background-color: rgba(255,255,255,.2)!important;
    color: #ccc;
    display: block;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 21px;
    text-decoration: none;
    text-align: left;
    vertical-align: top;
    margin-bottom: 10px;
`

const CompletionBar = styled.div`
    display: inline-block;
    backgoround-color: rgba(0,0,0,.2);
    border: 1px solid #aaa;

    // control the length of the bar
    width: 100%;
    max-width: 150px;
    padding: 0;
    margin: 8px 0 0;
    border-radius: 5px;
`

const CompletionBarProgress = styled.div`
    width: 1%;
    background-color: rgba(255,255,255,.4);
    max-width: 150px;
    padding: 0;
    margin: 0;
    border-radius: 5px;
    height: 5px;
`

const CompletionText = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #aaa!important;
    line-weight: 1.6;
    margin: 0 15px;
`

const EditCell = styled.td`
    vertical-align: top;
    width: 100px;
    // background: grey;
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

