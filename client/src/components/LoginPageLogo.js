import styled from "styled-components"
import logo_white from "../assets/images/logo/heluhelulogo_white.png"
import { Title } from "../account/formStyles"

export function LoginPageLogo() {
    return (
        <LogoContainer>
            <img src={logo_white} alt="heluhelu-logo" style={{width:"72px"}}/>
            <Text>Welcome to Heluhelu!</Text>
        </LogoContainer>
    )
}

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 26px auto;
`

const Text = styled.h2`
    color: #fff;
    font-size: 1.6em;
    text-align: center;
    margin: 8px auto;
`