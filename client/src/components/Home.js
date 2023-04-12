import { useState } from "react";
import ArticleImporter from "../articles/ArticleImporter";
import styled from "styled-components";

export function Home({onAddNewText}) {

    const [isShowReader, setShowReader] = useState(false)
    
    function handleClick() {
        setShowReader(!isShowReader)
    }
    return (
        <HomepageContainer>
            <HomepageTitle>Hawaiian Reader</HomepageTitle>
            <HomepageText>Hawaiian learning tool. Read your Hawaiian text and articles in to Hawaiian Reader to make reading easier and to track your vocabulary growth over time.</HomepageText>
            

            <HomepageButtonContainer className="upload-buttons">
                <EnterTextButton className="text" onClick={handleClick}>Enter Text</EnterTextButton>
                <ImportFileButton className="file">Import Text File</ImportFileButton>
            </HomepageButtonContainer>
            
            {isShowReader ? <ArticleImporter onAddNewText={onAddNewText}/> : ""}
            

            
        </HomepageContainer>
    ) 
}

const HomepageContainer = styled.div`
`

const HomepageTitle = styled.h1`
    margin-top: 72px;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    // color: #222;
    // margin-bottom: 36px;
    // font-family: readex prox, arial, sans-serif;
    // font-size: 48px;
    // text-align: center;
    // display: block;
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

const EnterTextButton = styled.button`
    display: inline-block;
    font-size: 21px;
    font-weight: 700;
    padding: 18px;
    min-width: 260px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 16px;
    margin: 0 20px 12px;
    // margin-bottom: 12px;
    background-color: #083d74!important;
    color: #fff!important;
    line-height: 1.6;
    cursor: pointer;
`

const ImportFileButton = styled.button`
    display: inline-block;
    font-size: 21px;
    font-weight: 700;
    padding: 18px;
    min-width: 260px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 16px;
    margin-bottom: 12px;
    background-color: # #ebe8e5!important;
    color: #555!important;
    line-height: 1.6;
    cursor: pointer;
`