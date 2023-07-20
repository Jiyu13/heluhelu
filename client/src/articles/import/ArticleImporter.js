import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 
import apiFetch from '../../api/ApiFetch';
import { ButtonButtons, SubmitButtons } from '../../components/Buttons';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../responsive';



function ArticleImporter({ articles, setArticles }) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })

    let navigate = useNavigate()
    function redirectArticles () {
        navigate('/')
    }

    const initialValues = {
        text: "",
        title: ""
    }

    const [formData, setFormData] = useState(initialValues)

    function handleOnChange(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newArticle = {
            text: formData.text,
            title: formData.title
        }

        apiFetch('/articles',{
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newArticle)
        })
        .then((res) => res.json())
        .then(newObj => {
            setArticles([newObj, ...articles]);
            setFormData(initialValues)
            redirectArticles()
        })

    }



    return (
        <PasteBox>
            <FormContainer onSubmit={handleSubmit}>
                <LabelTag>Title:</LabelTag>
                <ArticleTitle 
                    required
                    type="text"
                    placeholder="Add title here..."
                    name="title"
                    value={formData.title}
                    onChange={handleOnChange}
                />
                <br/>
                <LabelTag>Content:</LabelTag>
                <FormTextarea
                    required
                    placeholder="Paste your Hawaiian text here..."
                    name='text'
                    value={formData.text}
                    onChange={handleOnChange}

                />
                <br/>
                {isMobile ?
                    <>
                        <MobileSubmitButton type="submit" value="Save" />
                        <Link to="/import/file">
                            <MobileImportButton type="button" value="Import File" />
                        </Link>
                    </>
                    :
                    <>
                        <SubmitButton type="submit" value="Save" />
                        <Link to="/import/file">
                            <ImportButton type="button" value="Import File" />
                        </Link>
                    </>
                }
                
            </FormContainer>
        </PasteBox>
    );
}

export default ArticleImporter;

const MobileImportButton = styled(ButtonButtons)`
    width: 49%;
    float: right;
    margin-right: 0px;
`

const MobileSubmitButton = styled(SubmitButtons)`
    width: 48%;
    float: left;
` 

const ImportButton = styled(ButtonButtons)`
    
`

const SubmitButton = styled(SubmitButtons)`
    width: 100px;
`
const PasteBox = styled.div`
    max-width: 800px;
    text-align: center;
    font-size: 20px;
    line-height: 1.6;
    margin: 90px auto 0;
`

const FormContainer = styled.form`
    width: 100%;
    display: block;
`

const FormTextarea = styled.textarea`
    box-sizing: border-box;  // make it right aligned with popup
    width: 100%;
    border: 2px solid #ccc;
    padding: 12px 0 12px 5px;
    font-size: 18px;
    margin-bottom: 12px;
    height: 450px;
    line-height: 1.6;
    overflow: auto;
`

const ArticleTitle = styled.input`
    background-color: #ddd;
    border-radius: 8px;

    box-sizing: border-box;  // make it right aligned with popup
    width: 100%;
    border: 2px solid #ccc;
    padding: 12px 0 12px 5px;
    font-size: 18px;
    margin-bottom: 12px;
`

const LabelTag = styled.div`
    margin: 12px 0 6px 0;
    font-size: 18px;
    font-weight: Bold;
    line-weight: 1.6;
    text-align: center;
`