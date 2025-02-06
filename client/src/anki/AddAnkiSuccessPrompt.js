import close_btn from "../assets/images/close_btn.svg"
import { SignupButton } from "../account/formStyles"
import addToAnki from "../utils/addToAnki"
import { BodyText, ButtonContainer, ButtonImage, CancelButton, CloseButton, ContainerBody, ContainerHeader, Divider, PopupContainer, Title } from "./promptStyles"


export default function AddAnkiSuccessPrompt({setIsSucceed, trackWord}) {

    return (
        <PopupContainer>
            <ContainerHeader>
                <Title>
                    Add to Anki
                    {/* <div>(Please make sure Anki is running!)</div> */}
                </Title>
                <CloseButton onClick={() => setIsSucceed(false)}>
                    <ButtonImage src={close_btn} alt="close icon"/>
                </CloseButton>
            </ContainerHeader>
            <Divider/>
            <ContainerBody>

                <BodyText>
                    Successfully added &nbsp;
                    <span style={{fontSize: "1.5rem", fontWeight: "bold", textDecoration: "underline"}}> 
                        {trackWord}
                    </span> 
                    &nbsp; to Anki!
                </BodyText>

            </ContainerBody>

            <ButtonContainer className="button-container">
                {/* <CancelButton 
                    type="button" 
                    value="Cancel" 
                    onClick={() => setIsSucceed(false)}
                /> */}

                <SignupButton 
                    onClick={() => setIsSucceed()}
                    style={{width: "120px", marginTop: "0", marginBottom: "0px"}}
                >
                    OK
                </SignupButton>
            </ButtonContainer>
        </PopupContainer>
    )
}


