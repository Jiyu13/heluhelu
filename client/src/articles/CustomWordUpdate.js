import { useContext } from "react"
import { useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import apiFetch from "../api/ApiFetch"


import add_icon from "../assets/images/add_icon.svg"
import check_circle_icon from "../assets/images/check_circle_icon.svg"
import { ButtonButtons, SubmitButtons } from "../components/Buttons"



export function CustomWordUpdate({word, setCustomWord, PostAndDelete, checkStatus}) {
    const {user} = useContext(UserContext)
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState(word)

    function handleEditClick() {
        setIsEdit(!isEdit)
    }

    function handleDeleteCustomWord() {
        apiFetch(`/user_word/${word.id}`, {
            method: "DELETE"
        })
        .then(() => {
            setCustomWord(null)})
    }

    function handleOnchange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    function handleSubmit(e) {
        e.preventDefault()

        const updatedWord = {
            word: formData.word,
            translation: formData.translation,
            user_id: user.id
        }

        
        apiFetch(`/user_word/${word.id}`, {
            method: "PATCH",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(updatedWord)
        })
        .then(res => res.json())
        .then(data => {
            setCustomWord(data)
            setIsEdit(!isEdit)
        })
    }


    function handleMarkStudying() {
        PostAndDelete(word.word, 1)
    }

    let src
    let bgColor
    if (checkStatus(word.word) === 1) {
        bgColor = "#2ecc71"
        src = check_circle_icon 
    } else {
        bgColor = ""
        src = add_icon
    }



    return (
        <WordItem key={word.id}>
            <Word>
                {word.word}:
                <ButtonContainer>
                    <EditDelete type="submit" className="edit-delete" value="Edit" onClick={handleEditClick} />
                    <EditDelete type="submit" className="edit-delete" value="Delete" onClick={handleDeleteCustomWord} />

                    <MarkStudyingImg
                        src={src}
                        alt="mark studying button"
                        onClick={handleMarkStudying}
                        style={{backgroundColor: bgColor}}
                    />
                </ButtonContainer>
                
            </Word>
            <Translation>{word.translation}</Translation>
            {/* <br></br> */}
            
            {isEdit && (
                <EditForm onSubmit={handleSubmit}>
                    <Label>Hawaiian:
                    <br/>
                    <WordInput
                        required
                        disabled
                        type="text"
                        name="word"
                        value={formData.word}
                        onChange={handleOnchange}
                    />
                    </Label>
                    <br/>
                    <Label>Translation:
                    <br/>
                    <TranslationInput
                        required
                        type="textarea"
                        name="translation"
                        value={formData.translation}
                        onChange={handleOnchange}
                    />
                    <br/>
                    </Label>
                    <UpdateButton type="submit" value="Update" />
                    <CancelButton type="button" value="Cancel" onClick={() => setIsEdit(!isEdit)}/>
                </EditForm>
            )}
            
            
            <hr/>
        </WordItem>
    )
}



const EditDelete = styled(SubmitButtons)`
    width: auto;
    margin-top: 0;
    margin-right: 5px;
    font-weight: normal;
    font-size: 15px;
    padding: 3px 5px;
    vertical-align: middle;

    &:hover {
        cursor: pointer;
    }
`

const MarkStudyingImg = styled.img`
    float: right;
    width: 25px;
    height: 25px;
    margin-top: 5px;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
`


const UpdateButton = styled(SubmitButtons)`
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    margin-top: 0px;
    padding: 6px 4px;

`

const CancelButton = styled(ButtonButtons)`
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    margin-top: 0px;
    padding: 6px 4px;
`

const TranslationInput = styled.textarea`
    width: 90%;
    max-width: 235px;
    height: 100px;
`

const WordInput = styled.input`
    width: 90%;
    max-width: 235px;   
`

const Label = styled.label`
    font-size: 15px;
    font-weight: bold;
`

const EditForm = styled.form`
    border: 1px solid #eee;
    margin-top: 15px;
    padding: 10px;
    text-align: center;
`
const ButtonContainer = styled.div`
    margin-left: auto;
`

const WordItem = styled.div``

const Word = styled.div`
    color: #27ae60;
    font-weight: bold;
    display: flex;  // display two elements in one line
`

const Translation = styled.div`
    display: inline;
    width: 100%;
`
