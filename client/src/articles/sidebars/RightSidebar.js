import right_arrow_white_icon from "../../assets/images/white/arrow_forward_ios_white_48dp.svg"
import right_arrow_black_icon from "../../assets/images/black/arrow_forward_ios_black_48dp.svg"
import finish_reading_black_icon from "../../assets/images/black/done_black_48dp.svg"
import finish_reading_white_icon from "../../assets/images/white/done_white_48dp.svg"



import styled from "styled-components"
import { UserContext } from "../../components/UserContext"
import { useContext } from "react"


export function RightSidebar( {handleNextPage, currentPage, pages, bgColor, handleFinishReading} ) {

    const {isDark} = useContext(UserContext)

    return (
        <>
        
            {currentPage === pages - 1 ?  
                <SideBar onClick={handleFinishReading} >
                    <SideBarImage>
                        <FinishReadingImg 
                            src={isDark ? finish_reading_white_icon : finish_reading_black_icon}
                            alt="finish reading icon"
                            style={{backgroundColor: bgColor}}
                        />
                    </SideBarImage>
                </SideBar>
                :
                <SideBar onClick={handleNextPage} >
                    <SideBarImage>
                        <img 
                            src={isDark ? right_arrow_white_icon : right_arrow_black_icon} 
                            alt="right arrow icon"
                        />
                    </SideBarImage>
                </SideBar>    
            }
        </>
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

const FinishReadingImg = styled.img`
    border-radius: 50%;
    &:hover {
        background-color: #A1C181;
    }
`