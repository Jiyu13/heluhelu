import {Link} from "react-router-dom";
import styled from "styled-components"

import edit_icon from "../assets/images/edit_icon.svg"
import delete_icon from "../assets/images/delete_icon.svg"
import share_icon from "../assets/images/share_icon.svg"


export function ArticleList( {articles} ) {


    return (
    <ArticlesListContainer>

        <ArticlesListTable>
            <tbody>
            {articles?.map(article =>
                // console.log(article)
                <tr key={article.id}>
                    {/* td */}
                    <ArticleTitleCell>  
                        <ArticleTitle>
                            <Link to={`/articles/${article.id}`} style={{textDecoration: 'none'}}>
                                {article.id}. {article.title}
                            </Link>

                        </ArticleTitle>
                    </ArticleTitleCell>

                    <EditCell>
                        <EditContainer>
                            <Button >
                                <Link to={`/article/edit/${article.id}`}>
                                    <ButtonImage src={edit_icon} alt="edit icon"/>
                                </Link>
                                
                            </Button>
                            <Button>
                                <ButtonImage src={delete_icon} alt="delete icon"/>
                            </Button>

                            <Button>
                                <ButtonImage src={share_icon} alt="share icon"/>
                            </Button>

                        </EditContainer>

                    </EditCell>
                </tr>
                
            )}

            </tbody>

        </ArticlesListTable>

    </ArticlesListContainer> 
    )
}

const ArticlesListContainer = styled.div`
    margin: 0 auto;
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
`
const ArticleTitle = styled.div`
    background-color: rgba(255,255,255,.2)!important;
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
    background: grey;
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
    background-color: rgba(255,255,255,.2);
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
    color: #2668ac;
    text-decoration: none;
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