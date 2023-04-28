// import { useState } from "react"
// import styled from "styled-components"

// export function CustomeWordForm() {

//     const [wordExistError, setWordExistError] = useState(null)


//     // ========= handle adding custom translation for word ======================
//     const initialValues = {
//         word: "",
//         translation: ""
//     }
    
//     const [formData, setFormData] = useState(initialValues)

    
    
//     function handleCustomWord(e) {
//         const value = e.target.value
//         const name = e.target.name
//         setFormData({...formData, [name]: value})
//     }
    
//     function handleCustomSubmit(e) {
//         e.preventDefault()
        
//         const newCustomWord = {
//             word: formData.word,
//             translation: formData.translation,
//             user_id: user.id
//         }

//         apiFetch('/user_words', {
//             method: "POST",
//             headers: {"Content-Type": 'application/json'},
//             body: JSON.stringify(newCustomWord)
//         })
//         .then(res => {
//             if (res.ok) {
//                 res.json().then(newWord => {
//                     setCustomWord(newWord)
//                     setCustomForm(!showCustomForm)
//                     setFormData(initialValues)
//                 })
//             } else {
//                 if (res.status === 422) {
//                     res.json().then(error => {
//                         console.log(error)
//                         setWordExistError(error)
                        
//                     })
//                 }
//                 console.log(wordExistError)
                
//             }
//         })
//     }

//     return (
//         <CustomForm onSubmit={handleCustomSubmit}>
//             <Label>Hawaiian:
//                 <br/>
//                 <WordInput
//                     required
//                     disabled
//                     type="text"
//                     name="word"
//                     value={formData.word}
//                     // onChange={handleCustomWord}
//                 />
//             </Label>
//             <br/>
//             <Label>Translation:
//                 <br/>
//                 <TranslationInput
//                     required
//                     type="text"
//                     name="translation"
//                     value={formData.translation}
//                     onChange={handleCustomWord}
//                 />
//                 <br/>
//             </Label>
//             {wordExistError ? <ExistWarning>{wordExistError.message}</ExistWarning> : ""}
//             <br/>
//             <SaveButton type="submit" value="Save"/>
//         </CustomForm>
//     )
// }


// const SaveButton = styled.input`
//     width: 90%;
//     min-width: 200px !important;
//     max-width: 235px;  
//     width: 0.1em; 
//     height: 2em;
// `

// const TranslationInput = styled.input`
//     width: 90%;
//     max-width: 235px;
// `

// const WordInput = styled.input`
//     width: 90%;
//     max-width: 235px;   
// `

// const Label = styled.label`
//     font-size: 15px;
//     font-weight: bold;
// `

// const CustomForm = styled.form`
//     max-width: 265px;
//     border: 1px solid #eee;
//     margin-top: 35px;
//     padding: 10px;
// `