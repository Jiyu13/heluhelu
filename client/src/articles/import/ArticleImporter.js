import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from "react";
import { UserContext } from "../../components/UserContext";    
import apiFetch from '../../api/ApiFetch';



function ArticleImporter() {

    const {articles, setArticles} = useContext(UserContext)

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

                <SubmitButton type="submit" value="Save" />
                <Link to="/import/file">
                    <ImportButton type="button" value="Import File" />
                </Link>
                
                <br/>
                <ArticleTitle 
                    required
                    type="text"
                    placeholder="Add title here..."
                    name="title"
                    value={formData.title}
                    onChange={handleOnChange}
                />
                <br/>
                <FormTextarea
                    required
                    placeholder="Paste your Hawaiian text here..."
                    name='text'
                    value={formData.text}
                    onChange={handleOnChange}

                />
                <br/>
                
            </FormContainer>
        </PasteBox>
    );
}

export default ArticleImporter;

const ImportButton = styled.input`
    margin-top: 12px;
    width: 100px;
    padding: 8px;
    background: #feca57;
    color: white;
    border-radius: 8px;
    border: none;

    &:hover {
        background: #ff9f43; !important;
    }
`

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


export const SubmitButton = styled.input`
    margin-top: 12px;
    margin-right: 12px;
    width: 100px;
    padding: 8px;

    &:hover {
        background: rgb(8, 61, 116) !important;
        color: white;
      }
`