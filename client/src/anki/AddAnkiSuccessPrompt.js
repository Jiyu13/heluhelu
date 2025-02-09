import close_btn from "../assets/images/close_btn.svg"
import { SignupButton } from "../account/formStyles"
import { BodyText, ButtonContainer, ContainerBody, PopupContainer } from "./promptStyles"


export default function AddAnkiSuccessPrompt({setAddAnkiSucceed, word}) {
    
    return (
        <PopupContainer>
            {/* <ContainerHeader> */}
                {/* <Title>
                    Added to Anki
                </Title> */}
                {/* <CloseButton onClick={() => setAddAnkiSucceed(false)}>
                    <ButtonImage src={close_btn} alt="close icon"/>
                </CloseButton> */}
            {/* </ContainerHeader> */}
            {/* <Divider/> */}
            <ContainerBody>

                <BodyText>
                    Added &nbsp;
                    <span style={{fontSize: "1.5rem", fontWeight: "bold", textDecoration: "underline"}}> 
                        {word}
                    </span> 
                    &nbsp; to Anki!
                </BodyText>

            </ContainerBody>

            <ButtonContainer className="button-container">
                <SignupButton 
                    onClick={() => setAddAnkiSucceed(false)}
                    style={{width: "120px", marginTop: "0", marginBottom: "0px"}}
                >
                    OK
                </SignupButton>
            </ButtonContainer>
        </PopupContainer>
    )
}


