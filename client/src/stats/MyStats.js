import { useEffect, useState } from "react"
import styled from "styled-components"
import { ReadingStats } from "./ReadingStats"
import apiFetch from "../api/ApiFetch"
import { Link } from "react-router-dom"
import { SubmitButtons } from "../components/Buttons"
import { useMediaQuery } from "react-responsive"
import { DeviceSize } from "../responsive"

export function MyStats() {
    const [readEvents, setReadEvets] = useState(null)
     
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile})

    useEffect(() => {
        apiFetch('/stats')
        .then(res => res.json())
        .then(data => setReadEvets(data))
    }, [])


    return (
        <PageContainer>
            {isMobile && (
                <Link to="/stats/vocabularies">
                    <VocabStatsPage type="button" value="Vocabulary Stats" />
                </Link>
            )}
            
            <StatsNavigation >
                

                <StatsTitle>Reading Stats</StatsTitle>
                {!isMobile && (
                    <Link to="/stats/vocabularies">
                        <VocabStatsPage type="button" value="Vocabulary Stats" />
                    </Link>
                )}
                

            </StatsNavigation>
            
            <StatsContainer>
                <ReadingStats readEvents={readEvents} setReadEvets={setReadEvets}/>
            </StatsContainer>
            
        </PageContainer>
        
    )
}

const VocabStatsPage = styled(SubmitButtons)``

const PageContainer = styled.div`
    margin: 90px auto 0;
    text-align: center;
`

export const StatsNavigation = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
`

export const StatsTitle = styled.h1`
    margin-top: 72px;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    margin-right: 20px;
`

const StatsContainer = styled.div``