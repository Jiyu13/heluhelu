import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"

export function ArticleWord({word}) {

    // const [chosen, setChosen] = useState("")
    // const [error, setError] = useState("")

    const {setChosen, setErrors, target, setTarget} = useContext(UserContext)


    function handleClick(e) {
        setTarget(e.target.id)
        console.log("clicked")
        
        fetch(`/search/${e.target.id}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setChosen(data)
                })
            } else {
                res.json(err => setErrors(err.errors))
            }
        })
        
    }    
    return (
        <WordContainer id={word} onClick={handleClick}>
            {word}            
        </WordContainer>

    )
}

const WordContainer = styled.div`
    border-radius: 10px;
    padding: 8px;
    display: inline-block;
    &:hover {
        color: #fff;
        background-color: #bdc3c7;
        cursor: pointer;
    }
`
