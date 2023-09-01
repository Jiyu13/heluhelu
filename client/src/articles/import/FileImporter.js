import { useState } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import apiFetch from "../../api/ApiFetch"
import { ButtonButtons, SubmitButtons } from "../../styles/Buttons"
import { DeviceSize } from "../../responsive"
import { useMediaQuery } from "react-responsive"
import { PageContainer } from "../../styles/Container"

export function FileImporter( {articles, setArticles} ) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })

    const [importText, setImportText] = useState(null)
    const [fileName, setFileName] = useState(null)


    let navigate = useNavigate()
    function redirectArticles () {
        navigate('/')
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

        apiFetch('/articles',{
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newArticle)
        })
        .then((res) => res.json())
        .then(newObj => {
            setArticles([newObj, ...articles]);
            redirectArticles()
        })
    }

    return (
        <FileBox>
            
            <FormContainer onSubmit={handleSubmit}>
                {/* <SubmitButton type="submit" value="Save" />
                <Link to="/import/text">
                    <ImportButton type="button" value="Import Text" />
                </Link>
                <br/> */}

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
                <ImportFileInput
                    required
                    type="file"
                    accept='.txt'
                    name='filename'
                    onChange={handleOnChange}
                />
                <SupportedFileText>Accepted file types: 
                    <span style={{color: "red", fontSize: "0.875rem"}}>.TXT.</span>
                </SupportedFileText>
                <br/>
                {isMobile ?
                    <>
                        <MobileSubmitButton type="submit" value="Save" />
                        <Link to="/import/text">
                            <MobileImportButton type="button" value="Import Text" />
                        </Link>
                    </>
                    :
                    <>
                        <SubmitButton type="submit" value="Save" />
                        <Link to="/import/text">
                            <ImportButton type="button" value="Import Text" />
                        </Link>
                    </>
                }
                
            </FormContainer>
        </FileBox>
    )
}

const SupportedFileText = styled.p`
    font-size: 0.875rem;
`

const MobileImportButton = styled(ButtonButtons)`
    width: 48%;
    float: right;
    margin-right: 0px;
`

const MobileSubmitButton = styled(SubmitButtons)`
    width: 48%;
    float: left;
` 

const ImportButton = styled(ButtonButtons)``
const SubmitButton = styled(SubmitButtons)`
    width: 100px;
`

const FileBox = styled(PageContainer)`
    max-width: 800px;
    // margin: 90px auto 0;
    // margin: 0 auto;
    // padding-top: 90px;
    line-height: 1.6;
    height: 100vh;

`

const FormContainer = styled.form`
    width: 100%;
    display: block;
`

const ImportFileInput = styled.input`
    background-color: #ddd;
    border-radius: 8px;

    box-sizing: border-box;  // make it right aligned with popup
    width: 100%;
    border: 2px solid #eee;
    padding: 12px 0 12px 5px;
    font-size: 18px;
    margin-bottom: 12px;
`

const TitleText = styled.div`
    margin: 12px 0 6px 0;
    font-size: 18px;
    font-weight: Bold;
    line-weight: 1.6;
    text-align: center;
`

const FileTitle = styled.input`
    background-color: #ddd;
    border-radius: 8px;

    box-sizing: border-box;  // make it right aligned with popup
    width: 100%;
    border: 2px solid #999;
    padding: 12px 0 12px 5px;
    font-size: 18px;
    margin-bottom: 12px;
`