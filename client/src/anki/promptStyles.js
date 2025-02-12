import styled from "styled-components"
import { ButtonButtons } from "../styles/Buttons"

export const AnkiError = styled.span`
    color: #000;
    text-align: center; 
    font-weight: bold; 
    padding-bottom: 10px'
`

export const AnkiButton = styled.button`
border: none;
padding: 0px;
background: none;
margin-right: 8px;
cursor: pointer;
`
export const AnkiImg = styled.img`
display: inline-block;
vertical-align: middle;
width: 30px;
cursor: pointer;
`

export const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    z-index: 10;
    width: 350px;
    max-width: 80%;
    
    padding: 8px;
`
export const ContainerHeader = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-item: center;

`
export const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;  
    margin: auto;
    color: #000;  
`
export const CloseButton = styled.button`
    cursor: pointer;    
    float: right;
    border: none;
    background-color: transparent;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 0 20px 15px 20px;
`
export const CancelButton = styled(ButtonButtons)`
    min-width: 120px !important;
    max-width: 120px;  
    height: 40px;
    font-size: 1em; 
    margin: 0px;
    border-radius: 8px;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    padding: 0px;
`

export const Divider = styled.hr`
    width: 90%;
    text-align: center;
    background-color: rgb(120, 120, 120, 0.5);
    height: 1px;
`

export const ButtonImage = styled.img`
    width: 20px;
    height: 20px;
`

export const ContainerBody = styled.div`
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-item: center;
`

export const BodyText = styled.div`
    color: #000;
    font-size: 1.1rem;
    margin: 12px auto ;
`
