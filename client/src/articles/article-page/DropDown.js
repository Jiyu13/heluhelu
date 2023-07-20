// import more_icon from "../assets/images/more_horiz_white_48dp.svg"
import info_white_48dp from "../../assets/images/info_white_48dp.svg"

import styled from "styled-components";
import { useState } from "react";




export function DropDown( {showInfo, setShowInfo} ) {

    const [showDropDown, setDropDown] = useState(false)

    // function handleDropDown() {
    //     setDropDown(!showDropDown)
    // }

    function handleShowInfo() {
        setDropDown(!showDropDown)
        setShowInfo(!showInfo)
    }

    return (
        <MenuContainer>
            <MenuTrigger>
                <MenuImage src={info_white_48dp} alt="article info icon" onClick={handleShowInfo}/>
            </MenuTrigger>
        </MenuContainer>
        // <MenuContainer>
        //     {showDropDown && (
        //         <EmptyDiv onClick={() => setDropDown(!showDropDown)}/>
        //     )}

        //     <MenuTrigger>
        //         <MenuImage src={more_icon} alt="more" onClick={handleDropDown}/>
        //     </MenuTrigger>

        //     {showDropDown ? 
        //         <DropDownMenu>
                    
        //             <MenuContent>
        //                 <DropDownItem onClick={handleShowInfo}>
                            
        //                     <LinkItem>
        //                         <TextWrapper>Article Info</TextWrapper>
        //                     </LinkItem>
        //                 </DropDownItem>
        //             </MenuContent>

        //         </DropDownMenu>
        //         :
        //         ""
        //     }
        // </MenuContainer>
    )
}


const MenuContainer = styled.div`
    // position: relative;
    // vertical-align: top;
    // height: 23px;
`
const MenuTrigger = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
`
const MenuImage = styled.img`
    grid-column-start: 8;
    grid-column-end: 8;
    justify-self: end;
    margin-right: 10px;
    opacity: 0.8;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`
// const EmptyDiv = styled.div`
//     width: 100%; 
//     height: 100%;
//     position: fixed;
// `

// const DropDownMenu = styled.div`
//     display: block;
//     background-color: white;
//     left: auto;
//     right: 0;
//     min-width: 8rem;
//     padding-left: 0;
//     padding-right: 0;
//     margin-right: 10px;
//     position: absolute;
//     z-index: 20;
//     border-radius: 8px;
//     grid-column-start: 7;
// `

// const MenuContent = styled.div`
//     border-radius: 1rem;
//     // padding-bottom: 0.5rem;
//     // padding-top: 0.5rem;
//     text-align: center;
// `

// const DropDownItem = styled.div`
//     // display: block;
//     justify-content: center;
//     align-items: center;
//     font-size: .875rem;
//     line-height: 1.5;
//     padding: 1rem 1rem;
//     position: relative;
//     &:hover {
//         cursor: pointer;
//         background-image: linear-gradient(to right, #00B09B, #96C93D);;
//     }
//     // &:first-child {
//     //     border-radius: 8px 8px 0 0;
//     // }

//     // &:last-child {
//     //     border-radius: 0 0 8px 8px;
//     // }
// `

// const LinkItem = styled.div`
//     text-decoration: none;
//     margin: 0 10px;
//     color: black;
//     opacity: 0.7;
//     &:hover {
//         opacity: 1;
//         cursor: pointer;    
//     }
    
// `

// const TextWrapper = styled.span``