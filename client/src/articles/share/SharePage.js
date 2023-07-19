import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../../components/UserContext"
import apiFetch from "../../api/ApiFetch"

import warning_white_24dp from "../../assets/images/warning_white_24dp.svg"

export function SharePage() {

    const {articles, setArticles } = useContext(UserContext)
    const { uuid } = useParams()
    const [sharedArticle, setSharedArticle] = useState("")
    const [isExist, setExist] = useState(false)
    const [ExistAlert, setAlert] = useState(null)


    let navigate = useNavigate()
    function redirectHomePage () {
        navigate('/')
    }

    useEffect(() => {
        apiFetch(`/articles/${uuid}`)
        .then(res => res.json())
        .then(data => {
            setSharedArticle(data)
        })
    }, [uuid])
    
    const newArticle = {
        text: sharedArticle?.text,
        title: sharedArticle?.title
    }


    function handleAddUserArticle(e) {
        if (e.target.value === "yes") {
             apiFetch(`/articles`, {
                method: "POST",
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(newArticle)
            })
            // .then((res) => {
            //     if (res.ok) {res.json().then(data => {
            //         setArticles([data, ...articles])
            //         redirectHomePage()
            //     })} else {
            //         if (res.status === 409) {
            //             setExist(!isExist)
            //             setAlert("Article already exists.")
            //             window.alert("Article already exists.")
            //         }
            //     }
            // })
            .then(res => res.json())
            .then(data => {
                setArticles([data, ...articles])
                redirectHomePage()
            })
        } else {
            redirectHomePage()
        }
           
    }


    return (
        <ShareReciveContainer>
            {/* {!isExist && ( */}
                {/* <> */}
                
                    <br/>
                    <br/>
                    <>Would you like to add this article to your Reader account?</>
                    <br/>
                    <br/>

                    <ShareArticleTitle>{sharedArticle.title}</ShareArticleTitle>
                    <br/>

                    <YesButton onClick={handleAddUserArticle} value="yes">Yes / Add</YesButton>
                    <NoButton onClick={handleAddUserArticle} value="no">No / Cancel</NoButton>
                {/* </>
            )} */}
            {/* {isExist && (
                <AlertContaier>
                    <img src={{warning_white_24dp}} alt="Article Exists Warning"/>
                    <p>Article already exists.</p>
                </AlertContaier>
            ) */}

            {/* } */}

        </ShareReciveContainer>
    )

}

// const AlertContaier = styled.div`
//     background-color: gray;
//     width: 60%;
//     margin: auto;
//     border-radius: 8px;
//     padding: 20px 0;
//     opacity: 0.8;
// `

const ShareReciveContainer = styled.div`
    text-align: center;
    margin: 90px auto 0;
    max-width: 800px;
    font-size: 20px;
    line-weight: 1.6;
`

const ShareArticleTitle = styled.h2`
`

const YesButton = styled.button`
    display: inline-block;
    font-size: 21px;
    font-weight: 700;
    padding: 18px;
    min-width: 260px;
    text-align: center;
    border: 2px solid rgb(204, 204, 204);
    border-radius: 16px;
    margin: 0px 20px 12px;
    line-height: 1.6;
    cursor: pointer;
    background-color: rgb(8, 61, 116) !important;
    color: rgb(255, 255, 255) !important;
`

const NoButton = styled.button`
    display: inline-block;
    font-size: 21px;
    font-weight: 700;
    padding: 18px;
    min-width: 260px;
    text-align: center;
    border: 2px solid rgb(204, 204, 204);
    border-radius: 16px;
    margin: 0px 20px 12px;
    line-height: 1.6;
    cursor: pointer;
    // background-color: rgb(8, 61, 116) !important;
    color: rgb(85, 85, 85) !important;
`