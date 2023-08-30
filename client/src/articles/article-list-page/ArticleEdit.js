import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import apiFetch from "../../api/ApiFetch";
import { SubmitButtons } from "../../components/Buttons";

import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../responsive";
import { ChangesSave } from "../../components/ChangesSave";

export function ArticleEdit( {onUpdatedArticle} ) {

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })
    const [isChanged, setChanged] = useState(false)

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
            <ChangesSave isChanged={isChanged}/>

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
                
                {isMobile ? 
                <MobileSubmitButton type="submit" value="Save"/>
                :
                <SubmitButton type="submit" value="Save"/>
                }
                
            </EditForm>
        </EditContainer>
    )

}


const MobileSubmitButton = styled(SubmitButtons) `
    width: 100%;
`

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

const EditForm = styled.form`
    display: block;
    // text-align: center;
    width: 100%;
`
 
const LabelTag = styled.div`
    margin: 12px 0 6px 0;
    font-size: 18px;
    font-weight: Bold;
    line-weight: 1.6;
    text-align: center;
`

const TitleInput = styled.input`
    box-sizing: border-box;  // make it right aligned with popup
    width: 100%;
    border: 2px solid #ccc;
    padding: 12px 0 12px 5px;
    font-size: 18px;
    margin-bottom: 12px;
`

const ContentTextarea = styled.textarea`
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