import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import apiFetch from "../api/ApiFetch";
import { SubmitButtons } from "../components/Buttons";

import check_white_24dp from "../assets/images/check_white_24dp.svg"

export function ArticleEdit( {onUpdatedArticle, setArticles, articles} ) {

    const [isChanged, setChanged] = useState(false)

    // let navigate = useNavigate()
    // // function redirectArticles() {
    // //     navigate('/')
    // // }


    // ================ fetch article ===================
    const {id} = useParams()
    const [formData, setFormData] = useState({})

    useEffect(() => {
        apiFetch(`/articles/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data.article))
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
            title: formData.title,
        }

        apiFetch(`/article/edit/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(updated)
        })
        .then(res => res.json())
        .then(updatedArticle => {
            onUpdatedArticle(updatedArticle)
            setChanged(!isChanged)
        })
    }

    

    return (
        <EditContainer>
            {isChanged && (
                <PopupContainer>
                    <PopupImage src={check_white_24dp} alt="changed successfully icon"/>
                    <PopupText>Changes saved.</PopupText>
                </PopupContainer>

            )}

            <EditForm onSubmit={handleSubmit}>
                <LabelTag>Title:</LabelTag>
                <TitleInput
                    required
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleOnchange}
                />
                <br/>

                <LabelTag>Content:</LabelTag>
                <ContentTextarea
                    required
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




const SubmitButton = styled(SubmitButtons) `
    width: 100px;
`

const EditContainer = styled.div`
    text-align: center;
    max-width: 800px;
    margin: 90px auto 0;
    font-size: 20px;
    line-weight: 1.6;
`

const PopupContainer = styled.div`
    max-width: 800px;
    display: flex;
    // justify-content: center;
    margin: 0 auto 20px;
    color: #fff; 
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    line-weight: 1.6;
    background: #52baf1;
    box-shadow: rgba(0,0,0,.1) 0 3px 5px, #15a1ec 0 0 0 1px inset;
`

const PopupImage = styled.img`
    margin-left: 20px;
`
const PopupText = styled.strong`
    margin: 20px 5px;
`

const EditForm = styled.form`
    margin: 0;
    padding: 0;
    display: block;
    text-align: center;
`
 
const LabelTag = styled.div`
    margin: 12px 0 6px 0;
    font-size: 15px;
    font-weight: Bold;
    line-weight: 1.6;
    text-align: center;
`

const TitleInput = styled.input`
    width: 95%;
    max-width: 800px;
    border: 2px solid #ccc;
    padding: 12px;
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