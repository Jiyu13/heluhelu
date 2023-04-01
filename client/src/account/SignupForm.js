import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import { Marginer } from "./Marginer";
import { BoxContainer, FormContainer, Input, MutedLink, SubmitButton, BoldLink } from "./formStylings";

export function SignupForm() {

    const { switchToLogin } = useContext(AccountContext)

    return (
        <BoxContainer>
            <FormContainer>
                <Input type='text' placeholder="Username"/>
                <Input type='text' placeholder="Password"/>
            </FormContainer>

            <Marginer direction="vertical" margin={10}/>
            <SubmitButton type="submit">Signup</SubmitButton>

            <Marginer direction="vertical" margin="1em"/>
            <MutedLink href="#">
                Already have an account? 
                <BoldLink href="#" onClick={switchToLogin}>Login</BoldLink>
            </MutedLink>

        </BoxContainer>
    )
}