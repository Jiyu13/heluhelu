import right_arrow_icon from "../../assets/images/arrowright.svg"
import finish_reading_icon from "../../assets/images/finish_reading_icon.svg"


import styled from "styled-components"


export function RightSidebar( {handleNextPage, currentPage, pages, bgColor, handleFinishReading} ) {
    return (
        <>
        
            {currentPage === pages - 1 ?  
                <SideBar onClick={handleFinishReading} >
                    <SideBarImage>
                        <FinishReadingImg 
                            src={finish_reading_icon} 
                            alt="finish reading icon"
                            style={{backgroundColor: bgColor}}
                        />
                    </SideBarImage>
                </SideBar>
                :
                <SideBar onClick={handleNextPage} >
                    <SideBarImage>
                        <img 
                            src={right_arrow_icon} 
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