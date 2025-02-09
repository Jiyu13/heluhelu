import close_btn from "../assets/images/close_btn.svg"
import { ButtonContainer, ButtonImage, CancelButton, CloseButton, ContainerBody, ContainerHeader, Divider, PopupContainer, Title } from "./promptStyles"


export default function AnkiErrorPrompt({ankiError, setAnkiError}) {

    
    return (
        <PopupContainer>
            <ContainerHeader>
                <Title>
                    Error
                </Title>
                <CloseButton onClick={() => setAnkiError("")}>
                    <ButtonImage src={close_btn} alt="close icon"/>
                </CloseButton>
            </ContainerHeader>
            <Divider/>
            <ContainerBody>
                {ankiError.includes('duplicate') ? 
                    <span style={{color: "red", textAlign: "center", fontWeight: "bold", paddingBottom: "10px"}}>This word already exists.</span>
                    :
                    <span style={{color: "red", textAlign: "center", fontWeight: "bold", paddingBottom: "10px"}}>{ankiError}</span>
                }
            </ContainerBody>

            <ButtonContainer>
                <CancelButton 
                    type="button" 
                    value="Cancel" 
                    onClick={() => setAnkiError("")}
                />
            </ButtonContainer>
        </PopupContainer>
    )
}
