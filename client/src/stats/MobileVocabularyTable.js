// import styled from "styled-components"
// import filter_24dp from "../assets/images/filter_24dp.svg"


// export function MobileVocabularyTable( { handleSelectFilter } ) {

//     function handleChange(e) {
//         handleSelectFilter(e.target.value)
//     }
    
//     return  (
//         <InfoContainer>
//             <FilterBy>
//                 <img src={filter_24dp} alt="filter icon"/>
//                 <FilterByText style={{fontSize: "3px"}}>
//                     Filter By:
//                 </FilterByText>
//             </FilterBy>
//             <SelectBar onChange={handleChange}>
//                 <option disabled>Select a Tag</option>
//                 <option>All Vocabs</option>
//                 <option>Known</option>
//                 <option>Studying</option>
//             </SelectBar>
//         </InfoContainer>

//     )
// }

// const InfoContainer = styled.div`
//     box-sizing: border-box;
//     width: 90%;
//     height: 60px;
//     margin: 15px auto 0px;
//     display: grid;
//     grid-template-columns: 0.5fr 1fr;
//     background-image:  linear-gradient(to right, #FDAB73, #AEC28F);
//     border-radius: 8px;
//     align-items: center;
//     text-align: center;
// `
// const FilterBy = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-right: 10px;
// `

// const FilterByText = styled.span`
//     margin-left: 5px;
//     justify-content: center;
//     font-size: .875rem !important;
//     font-weight: bold;
//     white-space: nowrap; // make "All Words" stay in the same line
// `

// const SelectBar = styled.select`
//     width: 40%;
// `

import styled from "styled-components"
import filter_black_24dp from "../assets/images/black/filter_black_24dp.svg"
import { useContext } from "react"
import { UserContext } from "../components/UserContext"

export function MobileVocabularyTable( props ) {

    const {
        handleFilterAll, handleFilterKnown, handleFilterStudying, 
    } = props
    
    const { vocabularies } = useContext(UserContext)

    function searchVocabs(status) {
        return vocabularies?.filter(v => v["status"] === status).map(v => v["hawaiian_clean"].toLowerCase())
    }

    const knownVocab = searchVocabs(2)?.length
    const studyingvocab = searchVocabs(1)?.length
    return  (
        <InfoContainer>
            <FilterBy>
                <img src={filter_black_24dp} alt="filter icon"/>
                <FilterByText >
                    Filter:
                </FilterByText>
                
            </FilterBy>
            <InfoItem href="#" onClick={handleFilterAll}>
                <AllWordIndicator/>
                <div style={{display: "flex", flexDirection:"column"}}>
                    <WordText>All</WordText>
                    <WordCount>{vocabularies?.length}</WordCount>
                </div>
                
            </InfoItem>
            <InfoItem href="#" onClick={handleFilterKnown}>
                <KnownWordIndicator/>
                <div style={{display: "flex", flexDirection:"column"}}>
                    <WordText>Known</WordText>
                    <WordCount>{knownVocab}</WordCount>
                </div>
                
            </InfoItem>
            <InfoItem href="#" onClick={handleFilterStudying}>
                <StudyingdIndicator/>
                <div style={{display: "flex", flexDirection:"column"}}>
                    <WordText>Studying</WordText>
                    <WordCount>{studyingvocab}</WordCount>
                </div>
                
            </InfoItem>
        </InfoContainer>

    )
}

export const InfoContainer = styled.div`
    box-sizing: border-box;
    width: 90%;
    margin: 15px auto 0px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    background-image:  linear-gradient(to right, #FDAB73, #AEC28F);
    border-radius: 8px;
`
export const FilterBy = styled.div`
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FilterByText = styled.span`
    margin-left: 5px;
    justify-content: center;
    font-size: .875rem !important;
    font-weight: bold;
    white-space: nowrap; // make "All Words" stay in the same line
    color: #000;
`

export const InfoItem = styled.a`
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    grid-column-gap: 5px;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    color: grey;
    cursor: pointer;
    text-decoration: none;
    height: 60px;

    border-top: 3px solid transparent;
    transition: all 220mx ease-in-out;

    &:focus {
        color: black; 
        border-top: 3px solid black;
    }
` 

export const WordCount = styled.div`
    margin-right: 15px;
    font-size: .775rem !important;
`

export const WordText = styled.span`
    justify-content: center;
    font-size: .975rem !important;
    font-weight: bold;
    white-space: nowrap; // make "All Words" stay in the same line
`

export const AllWordIndicator  = styled.div`
    margin-left: 15px;
    width: 8px;
    height: 2rem;
    background-color: #409078;
    border-color: #338fff;
    border-radius: 10px;
`

export const KnownWordIndicator = styled.div`
    margin-left: 15px;
    width: 8px;
    height: 2rem;
    background-color: #fff; // rgba(112, 161, 255, 0.5)
    border-color: #338fff;
    border-radius: 10px;
`

export const StudyingdIndicator = styled.div`
    margin-left: 15px;
    width: 8px;
    height: 2rem;
    background-color: rgba(255, 221, 89, 0.5);
    border-color: #338fff;
    border-radius: 10px;
`