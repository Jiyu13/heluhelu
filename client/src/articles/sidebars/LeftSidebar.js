import left_arrow_icon from "../../assets/images/arrowleft.svg"

import styled from "styled-components"

export function LeftSidebar( {handlePrevPage, leftArrow} ) {
    return (
        <SideBar onClick={handlePrevPage} style={{visibility: leftArrow}}>
            <SideBarImage>
                <img src={left_arrow_icon} alt="left arrow icon"/>
            </SideBarImage>
        </SideBar>
    )
}

const SideBar = styled.div`
    font-family: readex pro,arial,sans-serif;
    word-spacing: 0;
    box-sizing: border-box;
    font-size: 19px;
    flex-shrink: 1;
    width: 10%;
    cursor: pointer;
    text-align: center!important;
    flex-grow: 1;
    line-height: 1.6;
`

const SideBarImage = styled.div`
    width: 42px;
    height: 42px;
    margin: 100px auto 0 auto;
    opacity: .5;
`