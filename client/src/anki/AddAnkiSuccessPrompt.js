import close_btn from "../assets/images/close_btn.svg"
import { SignupButton } from "../account/formStyles"
import { BodyText, ButtonContainer, ButtonImage, CloseButton, ContainerBody, ContainerHeader, Divider, PopupContainer, Title } from "./promptStyles"


export default function AddAnkiSuccessPrompt({setIsSucceed, trackWord}) {

    return (
        <PopupContainer>
            <ContainerHeader>
                <Title>
                    Added to Anki
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


