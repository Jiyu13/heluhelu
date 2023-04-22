import { useEffect, useState } from "react"
import styled from "styled-components"
import { StatsTable } from "./StatsTable"

export function MyStats() {

    const [readEvents, setReadEvets] = useState(null)

    useEffect(() => {
        fetch('/stats')
        .then(res => res.json())
        .then(data => setReadEvets(data))
    }, [])

    return (
        <>
            <StatsTitle>My Stats</StatsTitle>

            <StatsTable readEvents={readEvents} setReadEvets={setReadEvets}/>
        </>
        
    )
}

const StatsTitle = styled.h1`
    margin-top: 72px;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`
