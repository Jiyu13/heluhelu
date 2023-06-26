import styled from "styled-components";
import { ArticleList } from "../articles/ArticleList";

import import_icon from "../assets/images/note_add_white_24dp.svg"
import { Link } from "react-router-dom";


export function Home({articles, onDeleteArticle}) {   

    return (
        <div>
            <HomepageTitle>Heluhelu</HomepageTitle>
            <HomepageText>Load your Hawaiian texts and get started reading! Click on words you don't know to see their definitions and keep track of your vocabulary as you read!</HomepageText>

            <HomepageButtonContainer className="upload-buttons">
                <Link to={"/import/text"}>
                    <ImportButton value="Import">
                        <ButtonSpan>
                            <img src={import_icon} alt="import new content"/>
                        </ButtonSpan>
                        <ButtonSpan>Import</ButtonSpan>
                    </ImportButton>
                </Link>
            </HomepageButtonContainer>

            <ArticleList articles={articles} onDeleteArticle={onDeleteArticle}/>

        </div>
    ) 
}

// ------------------import btn---------------------------
const ImportButton = styled.button`
    padding: 8px;
    margin-right: 0;
    width: 130px;
    cursor: pointer;
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
`