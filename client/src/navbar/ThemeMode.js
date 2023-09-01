import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import ReactSwitch from "react-switch"

export function ThemeMode() {
    const { isDark, setIsDark,
            // mode, setMode 
        } = useContext(UserContext)

    function ToggleMode() {
        setIsDark(!isDark)
        // setMode(curr => curr === "light" ? "dark" : "light")
    }

    return (
        <ThemeContainer>
            {/* {!isDark && (
                <ThemeButton className="light" onClick={ToggleMode}>
                    Light
                </ThemeButton>
            )}

            {isDark && (
                <ThemeButton className="dark" onClick={ToggleMode}>
                    Dark
                </ThemeButton>
            )} */}
            <ThemeButton onClick={ToggleMode}>
                {isDark === true ?  "Dark" : "light"}
            </ThemeButton>
            {/* <ReactSwitch 
                onChange={handleToggle}
                checked={mode === "dark"}
                offColor=""
                onColor=""
            /> */}
            
        </ThemeContainer>
        
    )
}

const ThemeContainer = styled.div`
  width: 36px;
  height: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`
const ThemeButton = styled.button`
    height: 28px;
    border-radius: 20px;
`