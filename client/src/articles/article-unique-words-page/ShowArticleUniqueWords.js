import { useState } from "react"
import apiFetch from "../../api/ApiFetch"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { ArticleVocabsLists } from "./UniqueVocabsLists"
import { StatsNavigation, StatsTitle } from "../../stats/MyStats"
import { FilterBy, FilterByText, InfoContainer, WordText } from "../../stats/VocabInfoTable"

import filter_24dp from "../../assets/images/filter_24dp.svg"
import { DeviceSize } from "../../responsive"
import { useMediaQuery } from "react-responsive"

export function ShowArticleUniqueWords() {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile})

    const { article_title, id } = useParams()

    const [studyingUnique, setStudyingUnique] = useState(null)
    const [knownUnique, setKnownUnique] = useState(null)
    const [unknownUnique, setUnknownUnique] = useState(null)

    const [filterResults, setFilterResult] = useState(null)

    useEffect(() => {
        apiFetch(`/article/word_stats/${id}/${article_title}`)
        .then(res => res.json())
        .then(data => {
            setStudyingUnique(data["studying_unique"])
            setKnownUnique(data["known_unique"])
            setUnknownUnique(data["unknown_unique"])
            setFilterResult(data["unknown_unique"])
        })
    }, [id, article_title])

    
    function handleFilterNewUnique() {
        setFilterResult(unknownUnique)
    }

    function handleFilterKnownUnique() {
        setFilterResult(knownUnique)
    }

    function handleFilterStudyingUnique() {
        setFilterResult(studyingUnique)
    }

    return (
        <PageContainer>
            <StatsNavigation>
                <StatsTitle>{article_title}</StatsTitle>
            </StatsNavigation>
            <NavigationContainer>
                <FilterBy>
                    <img src={filter_24dp} alt="filter icon"/>
                    <FilterByText style={{fontSize: "3px"}}>
                        {isMobile ? "Filter" : "Filter By"}
                    </FilterByText>
                    
                </FilterBy>
                <NavItem href="#" onClick={handleFilterNewUnique}>
                    {isMobile ? 
                        <IndicatorMobile style={{backgroundColor: "rgb(112, 161, 255"}}/>
                        :
                        <Indicator style={{backgroundColor: "rgb(112, 161, 255"}}/>
                    }
                    <WordText>New Words</WordText>
                </NavItem>
                <NavItem href="#" onClick={handleFilterKnownUnique}>
                    {isMobile ? 
                        <IndicatorMobile style={{backgroundColor: "rgb(75, 166, 127)"}}/>
                        :
                        <Indicator style={{backgroundColor: "rgb(75, 166, 127)"}}/>
                    }
                    <WordText>Knowns</WordText>
                </NavItem>
                <NavItem href="#" onClick={handleFilterStudyingUnique}>
                {isMobile ? 
                        <IndicatorMobile style={{backgroundColor: "rgb(243, 170, 96)"}}/>
                        :
                        <Indicator style={{backgroundColor: "rgb(243, 170, 96)"}}/>
                    }
                    <WordText>Studyings</WordText>
                </NavItem>
            </NavigationContainer>
            <StatsContainer>
                <ArticleVocabsLists filterResults={filterResults}/>
            </StatsContainer>
            
        </PageContainer>
    )
}
const Indicator = styled.div`
    display: inline-block;
    width: 2rem;
    height: 1.15rem;
    border-color: #338fff;
    border-radius: 10px;
    margin-right: 5px;
`
const IndicatorMobile = styled(Indicator)`
    width: 8px;
    height: 2rem;
`


const NavItem = styled.a`
    display: flex;
    margin: auto auto;
    color: grey;
    cursor: pointer;
    height: 60px;
    align-items: center;
    text-decoration: none;

    border-top: 3px solid transparent;
    transition: all 220mx ease-in-out;

    &:focus {
        color: black; 
        border-top: 3px solid black;
    }
`

const NavigationContainer = styled(InfoContainer)`
    max-width: 800px;
    text-align: center;
    grid-template-columns: repeat(4, 1fr);
`

const StatsContainer = styled.div``

const PageContainer = styled.div`
    margin: 90px auto 0;
`
