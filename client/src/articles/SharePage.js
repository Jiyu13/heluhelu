import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"

export function SharePage() {

    const { user, articles, setArticles } = useContext(UserContext)
    const { uuid } = useParams()
    const [sharedArticle, setSharedArticle] = useState("")


    let navigate = useNavigate()
    function redirectHomePage () {
        navigate('/')
    }

    function redirectArticles(){
        navigate('/articles')
    }

    useEffect(() => {
        fetch(`/articles/${uuid}`)
        .then(res => res.json())
        .then(data => setSharedArticle(data))
    }, [uuid])
    
    const userArticle = {
        user_id: user.id,
        article: sharedArticle.id,
    }


    function handleAddUserArticle(e) {
        console.log(e.target.value)

        if (e.target.value === "yes") {
             fetch(`/user_article/${uuid}`, {
                method: "POST",
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(userArticle)
            })
            .then(res => {
                if (res.ok) {res.json().then(data => {
                    setArticles([...articles, sharedArticle])
                    redirectArticles()
                })} else  {
                    if (res.status === 404) {
                        window.alert("This article does not exist in the database, please try again")
                    } else if (res.status === 409) {
                        window.alert("Article already exists.")
                    }
                }
            })
        } else {
            redirectHomePage()
        }
           
    }


    return (
        <ShareReciveContainer>
            <br/>
            <br/>
            <>Would you like to add this article to your Reader account?</>
            <br/>
            <br/>

            <ShareArticleTitle>{sharedArticle.title}</ShareArticleTitle>
            <br/>

            {/* <># words: {sharedArticle?.text.split("\n").length}</>
            <br/>
            <># pages: </>
            <br/>
            <># From: </>
            <br/>
            <br/>
            <br/> */}

            <YesButton onClick={handleAddUserArticle} value="yes">Yes / Add</YesButton>
            <NoButton onClick={handleAddUserArticle} value="no">No / Cancel</NoButton>

        </ShareReciveContainer>
    )

}

const ShareReciveContainer = styled.div`
    text-align: center;
    margin: 0 auto;
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