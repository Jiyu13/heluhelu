import styled from "styled-components"

export function VisibilityIcon( {ToggleIcon, visible, canSee, cannotSee} ) {
    
    return (
        <IconContainer onClick={ToggleIcon}>
            {visible ? 
                <img src={canSee} alt="visibility icon"/>
                :
                <img src={cannotSee} alt="visibility off icon"/>
            }
            {/* <img src={visibility_off_24} alt="visibility off icon"/> */}
        </IconContainer>
    )
}

export const IconContainer = styled.div`
    position: absolute;
    right: 8px;   // the right margin edge to the right edge of it's container block is 8px
    margin-top: 4px;
`