import styled from "styled-components"

import check_white_24dp from "../assets/images/white/check_white_24dp.svg"


export function ChangesSave( {isChanged} ) {

    return (
        <>
        
            {isChanged && (
                <PopupContainer>
                    <PopupImage src={check_white_24dp} alt="changed successfully icon"/>
                    <PopupText>Changes saved.</PopupText>
                </PopupContainer>

            )}
        </>
    )
}

const PopupContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 0 auto 20px;
    color: #fff; 
    border-radius: 8px;
    text-align: center;
    font-size: 15px;
    line-weight: 1.6;
    background: #52baf1;
    box-shadow: rgba(0,0,0,.1) 0 3px 5px, #15a1ec 0 0 0 1px inset;
`

const PopupImage = styled.img`
    margin-left: 20px;
`

const PopupText = styled.strong`
    margin: 20px 5px;
`