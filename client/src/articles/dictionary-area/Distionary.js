import styled from "styled-components";
import { CustomeWordForm } from "../../custom-word/CustomWordForm";
import { WordTracker } from "./WordTracker";
import { TranslationWord } from "../TranslationWord";
import { CustomWordUpdate } from "../CustomWordUpdate";
import add_icon from "../../assets/images/add_icon.svg"
import { handleFocus } from "./handleFocus";


export function Disctionary(props) {

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
        isDictionaryOpen,
        initialValues,
        setFormData,
        setCustomForm,
        setWordExistError
     
     } = props

    return (
        <DictionaryArea>
            <DictionaryAreaHeader>
                <SearchArea 
                    type="text"
                    value={targetWord}
                    onChange={handleSearchChange}
                    onFocus={handleFocus}
                />

                {customWord ? "" :
                    <ImageContainer>
                        <AddImage 
                            src={add_icon} 
                            alt="add custom word button" 
                            onClick={handleAddBtn} 
                            id={targetWord}
                        />
                    </ImageContainer>
                    
                }
            </DictionaryAreaHeader>
            

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

            <br/>

            {isDictionaryOpen && chosen &&(
                <WordTracker
                    target={targetWord} 
                    word={chosen} 
                    PostAndDelete={PostAndDelete} 
                    checkStatus={checkStatus}
                />
            )}

            {customWord === null && targetWord !== null && chosen?.length === 0 && (
                <>
                    <NotFound>
                        No results found for '{targetWord}'.
                    </NotFound>
                </>
                
            )}

            <TranslationArea>
                
                {customWord && (
                    <CustomWordUpdate
                        key={customWord.id} 
                        word={customWord} 
                        setCustomWord={setCustomWord} 
                        PostAndDelete={PostAndDelete} 
                        checkStatus={checkStatus}
                    />
                )}
                {chosen?.map((word, index) => 
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

// ================ search bar + add custom word button ============= 
const DictionaryAreaHeader = styled.div`
    display: flex;
    margin-top: 12px;
`
const SearchArea = styled.input`
    border-radius: 8px;
    height: 25px;
    font-size: 25px;
    max-width: 150px;
` 

const ImageContainer = styled.div`
    margin-left: 8px;
    margin-top: 5px;
`
const AddImage = styled.img`
    height: 25px;
    cursor: pointer;
`
// =====================================================

const DictionaryArea = styled.div`
    background-color: #282828;
    color: #ddd;
    max-width: 300px;
    min-width: 250px;
    flex-basis: 25%;
    box-sizing: border-box;
    padding: 0 12px 12px;
    line-height: 1.6;
    overflow: auto;
`

const NotFound = styled.div`
    margin: 45px 0;
    font-size: 25px;
`

const TranslationArea = styled.div``