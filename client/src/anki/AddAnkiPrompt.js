import close_btn from "../assets/images/close_btn.svg"
import { SignupButton } from "../account/formStyles"
import addToAnki from "../utils/addToAnki"
import { BodyText, ButtonContainer, ButtonImage, CancelButton, CloseButton, ContainerBody, ContainerHeader, Divider, PopupContainer, Title } from "./promptStyles"


export default function AddAnkiPrompt({
    words, sentence, trackWord, setAddToAnkiPrompt, setAnkiError, setIsSucceed
}) {
    function handleYesClick() {
        addToAnki(words, trackWord, sentence, setAnkiError, setAddToAnkiPrompt, setIsSucceed)
    }
    return (
        <PopupContainer>
            <ContainerHeader>
                <Title>
                    Add to Anki
                    {/* <div>(Please make sure Anki is running!)</div> */}
                </Title>
                <CloseButton onClick={() => setAddToAnkiPrompt(false)}>
                    <ButtonImage src={close_btn} alt="close icon"/>
                </CloseButton>
            </ContainerHeader>
            <Divider/>
            <ContainerBody>

                <BodyText>
                    Add&nbsp; 
                    <span style={{fontSize: "1.5rem", fontWeight: "bold", textDecoration: "underline"}}> 
                        {trackWord} 
                    </span> 
                    &nbsp;and its sentence to Anki?
                </BodyText>

            </ContainerBody>

            <ButtonContainer className="button-container">
                <CancelButton 
                    type="button" 
                    value="Cancel" 
                    onClick={() => setAddToAnkiPrompt(false)}
                />

                <SignupButton 
                    onClick={() => handleYesClick()}
                    style={{width: "120px", marginTop: "0", marginBottom: "0px"}}
                >
                    Yes
                </SignupButton>
            </ButtonContainer>
        </PopupContainer>
    )
}

// const PopupContainer = styled.div`
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: white;
//     border-radius: 10px;
//     z-index: 10;
//     width: 350px;
//     max-width: 80%;
    
//     padding: 8px;
// `
// const ContainerHeader = styled.div`
//     padding: 20px;
//     display: flex;
//     justify-content: space-between;
//     align-item: center;

// `
// const Title = styled.div`
//     font-size: 1.2rem;
//     font-weight: bold;  
//     margin: auto;
//     color: #000;  
// `
// const CloseButton = styled.button`
//     cursor: pointer;    
//     float: right;
//     border: none;
//     background-color: transparent;
// `

// const ButtonContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 10px;
//     padding: 20px;
// `
// const CancelButton = styled(ButtonButtons)`
//     min-width: 120px !important;
//     max-width: 120px;  
//     height: 40px;
//     font-size: 1em; 
//     margin: 0px;
//     border-radius: 8px;
//     border: none;
//     outline: none;
//     cursor: pointer;
//     font-weight: 600;
//     padding: 0px;
// `

// const Divider = styled.hr`
//     width: 90%;
//     text-align: center;
//     background-color: rgb(120, 120, 120, 0.5);
//     height: 1px;
// `

// const ButtonImage = styled.img`
//     width: 20px;
//     height: 20px;
// `

// const ContainerBody = styled.div`
//     padding: 10px 20px;
//     display: flex;
//     flex-direction: column;
//     // justify-content: space-between;
//     align-item: center;
// `

// const BodyText = styled.div`
//     color: #000;
//     font-size: 1.1rem;
//     margin: 12px auto ;
// `
