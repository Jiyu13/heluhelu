import styled from "styled-components"
import add_icon_white from "../../assets/images/white/add_icon_white.svg"
import { TranslationWord } from "../TranslationWord";
import {  CustomWordUpdate } from "../CustomWordUpdate"
import { WordTracker } from "./WordTracker";
import { CustomeWordForm } from "../../custom-word/CustomWordForm";
import { handleFocus } from "./handleFocus";


export function DictionaryMobile(props) {
    
    const {
           chosen,
           PostAndDelete, checkStatus,
           handleSearchChange,
           handleAddBtn,
           targetWord,
           customWord, 
           setCustomWord,
           formData,
           wordExistError,
           showCustomForm,
           isMobile,
           isDictionaryOpen,
           setDictionaryOpen,
           initialValues,
           setFormData,
           setCustomForm,
           setWordExistError,
           sentence, ankiError, setAnkiError, addAnkiSucceed, setAddAnkiSucceed

        } = props

    
    return (
        <DictionaryArea>
            <SearchArea 
                type="text"
                value={targetWord}
                onChange={handleSearchChange} 
                onFocus={handleFocus}
            />

            {customWord ? "" :
                <AddImage 
                    src={add_icon_white} 
                    alt="add custom word button" 
                    onClick={handleAddBtn} 
                    id={targetWord}
                    style={{marginRight: "5px"}}
                />
            }

            {showCustomForm && ( 
                <CustomeWordForm
                    initialValues={initialValues}
                    formData={formData}
                    setFormData={setFormData}
                    setCustomWord={setCustomWord}
                    showCustomForm={showCustomForm}
                    setCustomForm={setCustomForm}
                    setWordExistError={setWordExistError} 
                    wordExistError={wordExistError}
                    PostAndDelete={PostAndDelete}
                />
            )}
            {isDictionaryOpen && chosen &&(
                <WordTracker
                    target={targetWord} 
                    word={chosen} 
                    PostAndDelete={PostAndDelete} 
                    checkStatus={checkStatus}
                    isMobile={isMobile}
                    isDictionaryOpen={isDictionaryOpen}
                    setDictionaryOpen={setDictionaryOpen}
                    sentence={sentence}
                />
            )}

            {customWord === null && targetWord !== null && chosen?.length === 0 && (
                <NotFound>
                    No results found for '{targetWord}'.
                </NotFound>
            )}

            
            <TranslationArea>
                {customWord && (
                    <CustomWordUpdate 
                        key={customWord.id} 
                        word={customWord} 
                        setCustomWord={setCustomWord}
                        checkStatus={checkStatus}
                        PostAndDelete={PostAndDelete}
                    />
                )}
                {chosen?.map(word => 
                    <TranslationWord 
                        key={word.id} 
                        word={word.hawaiian} 
                        translation={word.translation} 
                        hawaiian_clean={word.hawaiian_clean}
                        PostAndDelete={PostAndDelete}
                        checkStatus={checkStatus}
                        isMobile={isMobile}
                        isDictionaryOpen={isDictionaryOpen}
                        setDictionaryOpen={setDictionaryOpen}

                        addAnkiSucceed={addAnkiSucceed}
                        setAddAnkiSucceed={setAddAnkiSucceed}
                        ankiError={ankiError}
                        setAnkiError={setAnkiError}
                    />
                )}
                
            </TranslationArea>
        </DictionaryArea>
            
    )
}

const DictionaryArea = styled.div`
    height: 70%;
    position: fixed;
    border-top: 2px solid rgb(204, 204, 204);
    border-radius: 8px 8px 0px 0px;
    bottom: 0px;
    width: 100%;
    box-sizing: border-box;
    background-color: #282828;
    color: #ddd;
    padding: 0 12px 0px 12px;
    z-index: 999;
    overflow: auto;
`

const NotFound = styled.div`
    margin: 45px 0;
    font-size: 25px;
`

const AddImage = styled.img`
    float: right;
    width: 25px;
    height: 25px;
    margin-top: 12px;
    margin-bottom: 12px;
    margin-right: 25px;
    cursor: pointer;
    border-radius: 50%;
`

const SearchArea = styled.input`
    border-radius: 8px;
    height: 20px;
    font-size: 25px;
    width: 82%;
    margin-top: 12px;
    margin-bottom: 12px;
    background-color: rgba(255, 255, 255, 0.9);
` 

const TranslationArea = styled.div``