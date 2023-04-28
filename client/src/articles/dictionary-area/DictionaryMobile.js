import styled from "styled-components"

import book_material_icon from "../../assets/images/book_material_icon.svg"
import add_icon from "../../assets/images/add_icon.svg"


import { TranslationWord } from "../TranslationWord";
import { CustomWord } from "../CustomWord"
import { useContext } from "react";
import { UserContext } from "../../components/UserContext";
import { WordTracker } from "./WordTracker";



export function DictionaryMobile(props) {
    
    const {
           word, PostAndDelete, checkStatus,
           handleSearchChange,
           handleAddBtn,
           handleCustomSubmit,
           handleCustomWord,
           handleCancel,
           articleWords,
           currentPage,
           targetWord,
           customWord, 
           setCustomWord,
           formData,
           wordExistError,
           pages,
           showCustomForm} = props

    const {chosen} = useContext(UserContext)
    
    return (
        <DictionaryArea>
            {/* <span style={{"font-size":"12px"}}>Total words: {articleWords?.length}</span> */}
            <br/>
            {/* <PagesContainer>
                <BookIcon><img src={book_material_icon} alt="book icon"/></BookIcon>
                <PageDisplay>pg: {currentPage + 1} of {pages}</PageDisplay>
            </PagesContainer> */}

            <div>
                <SearchArea 
                    type="text"
                    value={targetWord}
                    onChange={handleSearchChange} 
                />

                {customWord ? "" :
                    <AddImage 
                        src={add_icon} 
                        alt="add translation for word button" 
                        onClick={handleAddBtn} 
                        id={targetWord}
                    />
                }
            </div>

            {customWord === null && targetWord !== null && chosen?.length === 0 && (
                <NotFound>
                    No results found for '{targetWord}'.
                </NotFound>
            )}
            {showCustomForm && ( 
                <CustomForm onSubmit={handleCustomSubmit}>
                    <Label>Hawaiian:
                        <br/>
                        <WordInput
                            required
                            disabled
                            type="text"
                            name="word"
                            value={formData.word}
                        />
                    </Label>
                    <br/>
                    <Label>Translation:
                        <br/>
                        <TranslationInput
                            required
                            type="text"
                            name="translation"
                            value={formData.translation}
                            onChange={handleCustomWord}
                        />
                        <br/>
                    </Label>
                    {wordExistError ? <ExistWarning>{wordExistError.message}</ExistWarning> : ""}
                    <br/>
                    <SaveButton type="submit" value="Save" style={{"background-color": "rgb(8, 61, 116)", "color": "white"}}/>
                    <CancelButton type="button" value="Cancel" onClick={handleCancel}/>
                </CustomForm>
            )}
            <TranslationArea>
                <WordTracker word={word} PostAndDelete={PostAndDelete} checkStatus={checkStatus}/>
                {customWord && (<CustomWord key={customWord.id} word={customWord} setCustomWord={setCustomWord}/>)}
                {chosen?.map(word => 
                    <TranslationWord 
                        key={word.id} 
                        word={word.hawaiian} 
                        translation={word.translation} 
                        hawaiian_clean={word.hawaiian_clean}
                        PostAndDelete={PostAndDelete}
                        checkStatus={checkStatus}
                    />
                )}
                
            </TranslationArea>
        </DictionaryArea>
            
    )
}

const DictionaryArea = styled.div`
    // overflow: scroll;
    height: 350px;
    position: fixed;
    border-top: 2px solid rgb(204, 204, 204);
    border-radius: 8px 8px 0px 0px;
    bottom: 0px;
    width: 100%;
    box-sizing: border-box;
    background-color: #282828;
    color: #ddd;
    padding: 0 12px 12px 12px;
`


const ExistWarning = styled.span`
    color: red;
    font-size: 12px;
`

const CancelButton = styled.input`
    width: 90%;
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    height: 2em;
    margin-right: 15px;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
`

const SaveButton = styled.input`
    width: 90%;
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    height: 2em;
    margin-right: 15px;
    border: 0;
`

const TranslationInput = styled.input`
    width: 90%;
    max-width: 235px;
`

const WordInput = styled.input`
    width: 90%;
    max-width: 235px;   
`

const Label = styled.label`
    font-size: 15px;
    font-weight: bold;
`

const CustomForm = styled.form`
    border: 1px solid #eee;
    margin-top: 35px;
    padding: 10px;
    text-align: center;
`

const NotFound = styled.div`
    margin: 45px 0;
    font-size: 25px;
`

const AddImage = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 6px;
    cursor: pointer;
    float: right;
`

const SearchArea = styled.input`
    width: 90%;
    border-radius: 8px;
    height: 20px;
    font-size: 25px;
    max-width: 150px;
` 

const TranslationArea = styled.div`
    overflow-y: scroll;
    height: 370px;
`

const PagesContainer = styled.div`
    font-size: 20px;
    line-weight: 1.6;
    display: block;
`

const PageDisplay = styled.div`
    font-size: 12px;
    font-weight: 700;
    line-weight: 1;
    display: inline-block;
    vertical-align: top;
    padding-top:8px;
    padding-bottom: 10px;
    margin-left: 8px;
`

const BookIcon = styled.div`
    margin-top: 6px;
    display: inline-block;
    vertical-align: top;
    width: 30xpx;
    height: 25px;
`