import styled from "styled-components"
import filter_24dp from "../assets/images/filter_24dp.svg"
import { useContext } from "react"
import { UserContext } from "../components/UserContext"


export function VocabInfoTable( { handleFilterAll, handleFilterKnown, handleFilterStudying} ) {
    const { vocabularies } = useContext(UserContext)
    
    function searchVocabs(status) {
        return vocabularies?.filter(v => v["status"] === status).map(v => v["hawaiian_clean"].toLowerCase())
    }


    const knownVocab = searchVocabs(2)?.length
    const studyingvocab = searchVocabs(1)?.length
    // const igonredVocab = searchVocabs(3)?.length

    
    return  (
        <InfoContainer>
            <InfoItem>
                <div style={{marginRight: "10px"}}>
                    <img src={filter_24dp} alt="filter icon" style={{marginTop: "3px"}}/>
                </div>
                <WordText>Filter By:</WordText>
            </InfoItem>
            <InfoItem onClick={handleFilterAll}>
                <AllWordIndicator/>
                <WordText>All Vocabs</WordText>
                <WordCount>{vocabularies?.length}</WordCount>
            </InfoItem>
            <InfoItem onClick={handleFilterKnown}>
                <KnownWordIndicator/>
                <WordText>Known</WordText>
                <WordCount>{knownVocab}</WordCount>
            </InfoItem>
            <InfoItem onClick={handleFilterStudying}>
                <StudyingdIndicator/>
                <WordText>Studying</WordText>
                <WordCount>{studyingvocab}</WordCount>
            </InfoItem>
            {/* <InfoItem>
                <IgnoredWordIndicator/>
                <WordText>Ignored</WordText>
                <WordCount>{igonredVocab}</WordCount>
            </InfoItem> */}
        </InfoContainer>




        
    )
}

const InfoContainer = styled.div`
    box-sizing: border-box;
    width: 75%;
    margin: 15px auto 0px;
    display: grid;
    grid-template-columns: 0.5fr repeat(3, 1fr);
    background-image:  linear-gradient(to right, #FDAB73, #AEC28F);
    border-radius: 8px;
`

const InfoItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr 6fr;
    grid-column-gap: 5px;
    margin:20px auto;
    justify-content: center;
    align-items: center;
    padding: 0 40px;

    &:hover {
        cursor: pointer;
    }
` 

const WordCount = styled.div`
    margin-left: 10px;
    
`


const WordText = styled.span`
    justify-content: center;
    font-size: .875rem !important;
    font-weight: bold;
    white-space: nowrap; // make "All Words" stay in the same line
`

const AllWordIndicator  = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: #409078;
    border-color: #338fff;
    border-radius: 10px;
`

const KnownWordIndicator = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: #fff; // rgba(112, 161, 255, 0.5)
    border-color: #338fff;
    border-radius: 10px;
`

const StudyingdIndicator = styled.div`
    width: 2rem;
    height: 1.15rem;
    background-color: rgba(255, 221, 89, 0.5);
    border-color: #338fff;
    border-radius: 10px;
`

// const IgnoredWordIndicator = styled.div`
//     width: 2rem;
//     height: 1.15rem;
//     background-color: white;
//     border-color: #338fff;
//     border-radius: 10px;
// `