import styled from "styled-components"
import filter_24dp from "../assets/images/filter_24dp.svg"


export function MobileVocabularyTable( { handleSelectFilter } ) {

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