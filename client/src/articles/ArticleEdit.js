import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export function ArticleEdit( {onUpdatedArticle} ) {

    let navigate = useNavigate()
    function redirectArticles() {
        navigate('/articles')
    }


    // ================ fetch article ===================
    const {id} = useParams()
    const [formData, setFormData] = useState("")

    useEffect(() => {
        fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(article => setFormData(article))
    }, [id])
    
    // ================= handle editing article ========================== 
    function handleOnchange(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }


    function handleSubmit(e) {
        e.preventDefault()

        const updated = {
            text: formData.text,
            title: formData.title
        }

        // console.log(updated)

        fetch(`/article/edit/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(updated)
        })
        .then(res => res.json())
        .then(updatedArticle => {
            onUpdatedArticle(updatedArticle)
            redirectArticles()
        })
    }

    

    return (
        <EditContainer>
            <EditForm onSubmit={handleSubmit}>
                <LabelTag>Title:</LabelTag>
                <TitleInput 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleOnchange}
                />
                <br/>

                <LabelTag>Content:</LabelTag>
                <ContentTextarea
                    name="text"
                    value={formData.text}
                    onChange={handleOnchange}
                />
                <br/>

                <SubmitButton type="submit" value="Submit"/>
            </EditForm>
        </EditContainer>
    )

}


const EditContainer = styled.div`
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    font-size: 20px;
    line-weight: 1.6;
`

const EditForm = styled.form`
    margin: 0;
    padding: 0;
    display: block;
    text-align: center;
`
 
const LabelTag = styled.div`
    margin-top: 12px;
    font-size: 15px;
    font-weight: Bold;
    line-weight: 1.6;
    text-align: center;
`

const TitleInput = styled.input`
    width: 95%;
    max-width: 800px;
`

const ContentTextarea = styled.textarea`
    padding: 12px;
    margin-button: 12px;
    width: 95%;
    max-width: 800px;
    height: 350px;
    font-size: 18px;
    border: 2px solid #ccc;
    line-height: 1.6;
    overflow: auto;
`

const SubmitButton = styled.input`
    margin-top: 12px;
`