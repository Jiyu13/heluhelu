import { useContext } from "react"
import { useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import axios from "axios"

const api = axios.create({
    baseURL: ""
})

export function CustomWord({word, setCustomWord}) {


    const {user} = useContext(UserContext)
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState(word)

    function handleEditClick() {
        setIsEdit(!isEdit)
    }

    function handleDeleteCustomWord() {
        fetch(`/user_word/${word.id}`, {
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
        console.log("submitted")

        const updatedWord = {
            word: formData.word,
            translation: formData.translation,
            user_id: user.id
        }

        console.log(updatedWord)
        
        console.log(word.id)
        fetch(`/user_word/${word.id}`, {
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

    return (
        <WordItem key={word.id}>
            <Word>
                {word.word}:
                <ButtonContainer>
                    <Button type="button" value="Edit" onClick={handleEditClick}/>
                    <Button type="button" value="Delete" onClick={handleDeleteCustomWord}/>
                </ButtonContainer>
                
            </Word>
            <Translation>{word.translation}</Translation>
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
                        type="text"
                        name="translation"
                        value={formData.translation}
                        onChange={handleOnchange}
                    />
                    <br/>
                    </Label>
                    <UpdateButton type="submit" value="Update" style={{"background-color": "rgb(8, 61, 116)", "color": "white"}}/>
                    <CancelButton type="button" value="Cancel" onClick={() => setIsEdit(!isEdit)}/>
                </EditForm>
            )}
            
            
            <hr/>
        </WordItem>
    )
}



const UpdateButton = styled.input`
    width: 90%;
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    height: 2em;
    margin-right: 15px;
    border: 0;
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

const TranslationInput = styled.textarea`
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

const EditForm = styled.form`
    // max-width: 265px;
    border: 1px solid #eee;
    margin-top: 35px;
    padding: 10px;
    text-align: center;
`

const Button = styled.input`
    color: #2980b9;
    cursor: pointer;
    padding-left: 8px;
    border: none;
    background: none;
    display: inline-block;
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
