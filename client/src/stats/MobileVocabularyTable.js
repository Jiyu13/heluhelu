import styled from "styled-components"
import filter_24dp from "../assets/images/filter_24dp.svg"


export function MobileVocabularyTable( { handleSelectFilter} ) {

    function handleChange(e) {
        handleSelectFilter(e.target.value)
    }
    
    return  (
        <InfoContainer>
            <FilterBy>
                <img src={filter_24dp} alt="filter icon"/>
                <FilterByText style={{fontSize: "3px"}}>
                    Filter By:
                </FilterByText>
            </FilterBy>
            <SelectBar onChange={handleChange}>
                <option disabled>Select a Tag</option>
                <option>All Vocabs</option>
                <option>Known</option>
                <option>Studying</option>
            </SelectBar>
        </InfoContainer>

    )
}

const InfoContainer = styled.div`
    box-sizing: border-box;
    width: 90%;
    height: 60px;
    margin: 15px auto 0px;
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    background-image:  linear-gradient(to right, #FDAB73, #AEC28F);
    border-radius: 8px;
    // justify-content: center;
    align-items: center;
    text-align: center;
`
const FilterBy = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`

const FilterByText = styled.span`
    margin-left: 5px;
    justify-content: center;
    font-size: .875rem !important;
    font-weight: bold;
    white-space: nowrap; // make "All Words" stay in the same line
`

const SelectBar = styled.select`
    width: 40%;
`

const InfoItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    grid-column-gap: 5px;
    justify-content: center;
    align-items: center;
    margin:20px auto;

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