import styled from "styled-components";
import { ArticleList } from "../articles/ArticleList";

import import_icon from "../assets/images/note_add_white_24dp.svg"
import { Link } from "react-router-dom";


export function Home({articles, onDeleteArticle}) {

    return (
        <HomepageContainer>
            <HomepageTitle>Heluhelu</HomepageTitle>
            <HomepageText>Load your Hawaiian texts and get started reading! Click on words you don't know to see their definitions and keep track of your vocabulary as you read!</HomepageText>

            <HomepageButtonContainer className="upload-buttons">
                
                <ImportButton title="import text/article">
                    <Link to={"/import/text"} style={{textDecoration: "none"}}>
                        <span style={{display:"flex"}}>
                            <ImportIcon src={import_icon}/>
                            <InnerText>Import</InnerText>
                            {/* <DropDownIcon src={drop_down}/> */}
                        </span>
                    </Link>
                </ImportButton>
                

            </HomepageButtonContainer>

            <ArticleList articles={articles} onDeleteArticle={onDeleteArticle}/>

        </HomepageContainer>
    ) 
}

// ------------------import btn---------------------------
const ImportButton = styled.button`
    background-color: #192a56;
    border-radius: 8px;
    display: inline-block;
    align-items : center;
    cursor: pointer;
    text-align: center;
    pointer-events: auto;

    &:hover {
        transform: scale(1.2);
        transition-duration: 0.5s;
    }
`

const ImportIcon = styled.img`
    margin: 5px;
`


const InnerText = styled.span`
    margin: 5px;
    font-size: 1.2rem;
    color: #fff;
`

// ------------------import btn---------------------------


const HomepageContainer = styled.div`
`

const HomepageTitle = styled.h1`
    margin-top: 72px;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`

const HomepageText = styled.div`
    max-width: 700px;
    text-align: center;
    margin: 0 auto 18px auto;
    font-size: 14px;
    color: #999!important;
    line-height: 1.6;
    display: block;
    font-family: readex pro,arial,sans-serif;
`

const HomepageButtonContainer = styled.div`
    display: block;
    text-align: center;
    font-size: 20px;
    line-weight: 1.6;
`