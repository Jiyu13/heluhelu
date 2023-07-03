import { useEffect, useState } from "react"
import styled from "styled-components"
import { ReadingStats } from "./ReadingStats"
import apiFetch from "../api/ApiFetch"
import { Link } from "react-router-dom"

export function MyStats() {
    const [readEvents, setReadEvets] = useState(null)
     

    useEffect(() => {
        apiFetch('/stats')
        .then(res => res.json())
        .then(data => setReadEvets(data))
    }, [])


    return (
        <>
            <StatsTitle>My Stats</StatsTitle>
            <div>
                <Link to="/stats">Reading Stats</Link>
                <Link to="/stats/vocabularies">Vocabulary Stats</Link>
            </div>
            
            <StatsContainer>
                <ReadingStats readEvents={readEvents} setReadEvets={setReadEvets}/>
            </StatsContainer>
            
        </>
        
    )
}


export const StatsTitle = styled.h1`
    margin-top: 72px;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`

const StatsContainer = styled.div`
`