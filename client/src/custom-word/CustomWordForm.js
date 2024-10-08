import styled from "styled-components"
import { ButtonButtons, SubmitButtons } from "../styles/Buttons"
import apiFetch from "../api/ApiFetch"
import { useContext } from "react"
import { UserContext } from "../components/UserContext"

export function CustomeWordForm({
    initialValues,
    formData, setFormData, 
    setCustomWord, 
    showCustomForm, setCustomForm,
    setWordExistError, wordExistError,
    PostAndDelete
    }) {

    const { user } = useContext(UserContext)

    function handleCancel() {
        setCustomForm(false)
        setFormData(initialValues)
    }

    function handleCustomWord(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }

    function handleCustomSubmit(e) {
        e.preventDefault()
        
        const newCustomWord = {
            word: formData.word,
            translation: formData.translation,
            user_id: user.id
        }

        apiFetch('/user_words', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newCustomWord)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(newWord => {
                    setCustomWord(newWord)
                    setCustomForm(!showCustomForm)
                    setFormData(initialValues)
                    PostAndDelete(newWord.word, 1)
                })
            } else {
                if (res.status === 422) {
                    res.json().then(error => {
                        setWordExistError(error)
                    })
                }
                
            }
        })
    }

    return (
        <CustomForm onSubmit={handleCustomSubmit}>
            <Label>Hawaiian:
                <br/>
                <AddWordInputText
                    required
                    disabled
                    type="text"
                    name="word"
                    value={formData?.word}
                />
            </Label>
            <br/>
            <Label>Translation:
                <br/>
                <TranslationInput
                    required
                    type="text"
                    name="translation"
                    value={formData?.translation}
                    onChange={handleCustomWord}
                />
                <br/>
            </Label>

            {wordExistError ? <ExistWarning>{wordExistError.message}</ExistWarning> : ""}

            <SaveButton type="submit" value="Save" style={{backgroundColor: "rgb(8, 61, 116)", "color": "white"}}/>
            <CancelButton type="button" value="Cancel" onClick={handleCancel}/>
        </CustomForm>
    )
}



const CancelButton = styled(ButtonButtons)`
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    margin-top: 0px;
    padding: 6px 4px;
    font-size: 1rem;
`

const SaveButton = styled(SubmitButtons)`
    min-width: 90px !important;
    max-width: 120px;  
    width: 0.1em; 
    margin-top: 0px;
    padding: 6px 4px;
    font-size: 1rem;
`

const ExistWarning = styled.span`
    color: red;
    font-size: 12px;
`

const TranslationInput= styled.textarea`
    font-size: 1.2rem;
    width: 90%;
    max-width: 235px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.9);
`

const AddWordInputText = styled.input`
    font-size: 1.2rem;
    width: 90%;
    max-width: 235px;
    background-color: rgba(255, 255, 255, 0.9); 
`

const Label = styled.label`
    font-size: 1.2rem;
    font-weight: bold;
`

const CustomForm = styled.form`
    border: 1px solid #eee;
    margin-top: 35px;
    padding: 10px;
    text-align: center;
`