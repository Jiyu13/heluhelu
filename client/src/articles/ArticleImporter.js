import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function ArticleImporter( {onAddNewText } ) {


    let navigate = useNavigate()
    function redirectArticles () {
        navigate('/articles')
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

        fetch('/articles',{
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newArticle)
        })
        .then((res) => res.json())
        .then(newObj => {
            onAddNewText(newObj);
            setFormData(initialValues)
            redirectArticles()
        })

    }



    return (
        <PasteBox>
            
            {/* <h1>Enter your text: </h1> */}
            <FormContainer onSubmit={handleSubmit}>
                <FormTextarea
                    required
                    placeholder="Paste your Hawaiian text here..."
                    name='text'
                    value={formData.text}
                    onChange={handleOnChange}

                />
                <br/>
                <TitleText>
                    Give this text a title:
                </TitleText>
                <ArticleTitle 
                    required
                    type="text"
                    placeholder="Enter title here..."
                    name="title"
                    value={formData.title}
                    onChange={handleOnChange}
                />
                <br/>
                <SubmitButton type="submit" value="Submit" />
                <br/>
                
            </FormContainer>
        </PasteBox>
    );
}

export default ArticleImporter;

const PasteBox = styled.div`
    background-color: rgba(255, 255, 255, 0.4);
    padding: 18px;
    text-align: center;
    font-size: 20px;
    line-height: 1.6;
    display: block;
`

const FormContainer = styled.form`
    margin: 0;
    padding: 0;
    display: block;
`

const FormTextarea = styled.textarea`   
    padding: 12px;
    margin-bottom: 12px;
    width: 90%;
    max-width: 800px;
    height: 240px;
    font-size: 18px;
    border: 2px solid #ccc;
    border-radius: 8px;
`

const TitleText = styled.div`
    margin-top: 12px;
    font-size: 15px;
    font-weight: Bold;
    line-weight: 1.6;
    display: block;
`

const ArticleTitle = styled.input`
    width: 90%;
    max-width: 800px;
    background-color: #ddd;
    border: 2px solid #999;
    padding: 8px;
    margin-bottom: 8px;
    font-size: 17px;
    border-radius: 8px;
    outline: none;
    line-weight: 1.6;
`


const SubmitButton = styled.input`
    margin-top: 12px;
`