import close_btn from "../assets/images/close_btn.svg"
import { AnkiError, ButtonContainer, ButtonImage, CancelButton, CloseButton, 
    ContainerBody, ContainerHeader, Divider, PopupContainer, Title 
} from "./promptStyles"


export default function AnkiErrorPrompt({ankiError, setAnkiError}) {

    
    return (
        <PopupContainer>
            <ContainerHeader>
                <Title style={{color: "red"}}>
                    Error
                </Title>
                <CloseButton onClick={() => setAnkiError("")}>
                    <ButtonImage src={close_btn} alt="close icon"/>
                </CloseButton>
            </ContainerHeader>
            <Divider/>
            <ContainerBody>
                {typeof ankiError === "string" && ankiError.includes('duplicate') && 
                    <AnkiError>This word already exists.</AnkiError>
                }

                {typeof ankiError === "string" && ankiError.includes('Failed to fetch') && 
                    <AnkiError>
                        An unexpected error occurred.
                        <br></br> 

                        <div style={{textAlign: "center", color: "#000", padding: "8px", }}>
                            See more&nbsp; 
                            <a href="/anki-guide" style={{color:"rgb(41, 128, 185)", cursor: "pointer"}}>
                                here
                            </a>
                        </div>
                    </AnkiError>
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
