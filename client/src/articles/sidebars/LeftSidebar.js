import left_arrow_white_icon from "../../assets/images/white/arrow_back_ios_white_48dp.svg"
import left_arrow_black_icon from "../../assets/images/black/arrow_back_ios_black_48dp.svg"


import styled from "styled-components"
import { useContext } from "react"
import { UserContext } from "../../components/UserContext"

export function LeftSidebar( {handlePrevPage, leftArrow} ) {

    const {isDark} = useContext(UserContext)

    return (
        <SideBar onClick={handlePrevPage} style={{visibility: leftArrow}}>
            <SideBarImage>
                <img src={isDark ? left_arrow_white_icon : left_arrow_black_icon} alt="left arrow icon"/>
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