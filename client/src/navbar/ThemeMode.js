import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import ReactSwitch from "react-switch"
import sun_24_icon from "../assets/images/sun_24_icon.svg"
import dark_mode_24 from "../assets/images/dark_mode_24.svg"

export function ThemeMode() {
    const { isDark, setIsDark,
            // mode, setMode 
        } = useContext(UserContext)

    function ToggleMode() {
        setIsDark(!isDark)
    }

    return (
        <ThemeContainer>
            {/* <ThemeButton onClick={ToggleMode}>
                {isDark === true ? "Dark" : "light"}
            </ThemeButton> */}
            <ReactSwitch 
                // handleDiameter={20}
                onChange={ToggleMode}
                checked={isDark === true}
                onColor="#34495e"
                onHandleColor="#95a5a6"
                offColor="#86d3ff"
                offHandleColor="#2693e6"
                checkedIcon={
                    <SunIconDiv>
                        <SunIconImg src={dark_mode_24} alt="dark mode icon"/>
                    </SunIconDiv>
                }
                uncheckedIcon={
                    <SunIconDiv>
                        <SunIconImg src={sun_24_icon} alt="light mode icon"/>
                    </SunIconDiv>
                }
            />
            
        </ThemeContainer>
        
    )
}

const SunIconImg = styled.img`
    height: 22px
`

const SunIconDiv = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    top: 3px;
`

const ThemeContainer = styled.div`
  width: 36px;
  height: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`
const ThemeButton = styled.button`
    height: 28px;
    border-radius: 20px;
    border: none;
`