import {Link} from "react-router-dom";
import styled from "styled-components"

import edit_icon from "../assets/images/edit_icon.svg"
import delete_icon from "../assets/images/delete_icon.svg"
import share_icon from "../assets/images/share_icon.svg"
import { useContext } from "react";
import { UserContext } from "../components/UserContext";


export function ArticleList( {articles, onDeleteArticle} ) {

    function handleDelete(e) {
        const article_id = parseInt(e.target.id)
        fetch(`/user_article/${article_id}`, {
            method: "DELETE",
        })
        .then(() => {
            onDeleteArticle(article_id)})
    }

    return (
    <ArticlesListContainer>
        {articles.length ?  
        <ArticlesListTable>
            <tbody>
            {articles.map(article =>
                <tr key={article.id}>
                    {/* td */}
                    <ArticleTitleCell>  
                        <ArticleTitle>
                            <Link to={`/articles/${article.id}`} style={{textDecoration: 'none'}} id={article.id}>
                                {/* {article.id}. {article.title} */}
                                {article.title}
                            </Link>

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
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: gray;
    text-align: center;
    font-size: 20px;
    line-height: 1.6;
    
`

const ArticleTitleCell = styled.td`
    vertical-align: top;
    font-family: readex pro,arial,sans-serif;
    display: table-cell;
    vertical-align: inherit;
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
    line-height: 1.6;
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