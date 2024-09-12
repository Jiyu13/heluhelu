import { Title } from "../account/formStyles";

import styled from "styled-components";
 

export function ResetEmailSent({emailSent}) {
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
            <Title>Reset Request Sent</Title>
            <Text>
                {emailSent}
            </Text>
        </div>
    )
}

const Text = styled.p`
    color: white;
    padding: 0 2rem;
    text-align: center;
    line-height: 200%;
`