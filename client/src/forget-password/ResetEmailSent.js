import { FormContainer, Title } from "../account/formStyles";

import styled from "styled-components";
 

export function ResetEmailSent({emailSent}) {
    return (
        <FormContainer style={{paddingBottom: "6rem", gap: "2rem", display: "flex", flexDirection: "column"}}>
            <Title>Reset Request Sent</Title>
            <Text>
                {emailSent}
            </Text>
        </FormContainer>
    )
}

const Text = styled.p`
    color: white;
    padding: 0 2rem;
    text-align: center;
    line-height: 200%;
`