import { useContext } from "react"
import { useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import { useNavigate } from "react-router-dom"
import { SubmitButton } from "./ArticleImporter"

export function FileImport() {

    const [importText, setImportText] = useState(null)
    const [fileName, setFileName] = useState(null)

    const {user, articles, setArticles} = useContext(UserContext)

    let navigate = useNavigate()
    function redirectArticles () {
        navigate('/articles')
    }

    function handleTitleChange(e) {
        setFileName(e.target.value)
    }
        
    function handleOnChange(e) {
        if (e.target.files.length === 0) return

        const filename = e.target.files[0]
        setFileName(filename.name.replace(".txt",""))

        const reader = new FileReader()

        // async() -> run in the background
        // onload -> what to do after the file is opened
        reader.onload = async (e) => { 
          const text = (e.target.result)
          setImportText(text)
        }

        // start to open file as a txt file
        reader.readAsText(filename)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const newArticle = {
            title: fileName,
            text: importText,
        }

        fetch('/articles',{
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newArticle)
        })
        .then((res) => res.json())
        .then(newObj => {
            setArticles([newObj, ...articles]);
            // setFormData(initialValues)
            redirectArticles()
        })
    }

    return (
        <FileBox>
            <b>Accepted file types: .txt.</b>
            <br/>
            <br/>
            <FormContainer onSubmit={handleSubmit}>
            {/*  */}
                <ImportFileInput
                    required
                    type="file"
                    accept='.txt'
                    name='filename'
                    onChange={handleOnChange}
                />
                <br/>
                <TitleText>
                    Give this document a title:
                </TitleText>
                <FileTitle 
                    required
                    type="text"
                    placeholder="Enter title here..."
                    name="title"
                    value={fileName}
                    onChange={handleTitleChange}
                />
                <br/>
                <SubmitButton type="submit" value="Import" />
                <br/>
                
            </FormContainer>
        </FileBox>
    )
}

const FileBox = styled.div`
    background-color: rgb(204, 204, 204);
    padding: 18px;
    text-align: center;
    display: block;
`

const FormContainer = styled.form`
    margin: 0;
    padding: 0;
    display: block;
`

const ImportFileInput = styled.input`
    padding: 12px;
    margin-bottom: 12px;
    width: 90%;
    max-width: 700px;
    font-size: 18px;
    border: 2px solid #eee;
    border-radius: 8px;
`

const TitleText = styled.div`
    margin-top: 12px;
    font-size: 15px;
    font-weight: Bold;
`

const FileTitle = styled.input`
    width: 90%;
    max-width: 700px;
    background-color: #ddd;
    border: 2px solid #999;
    padding: 8px;
    margin-bottom: 8px;
    font-size: 17px;
    border-radius: 8px;
    outline: none;
    line-weight: 1.6;
`