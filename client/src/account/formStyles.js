import styled from "styled-components"
export const BoxContainer = styled.div`
    position: relative; // relative to its normal position, which is AppContainer
    width: 400px;
    height: 450px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
`

export const FormContainer = styled.form``

export const Title = styled.h2`
    font-size: 2em;
    color: #fff;
    text-align: center;
`

export const InputBox = styled.div`
    position: relative; // absolute to its first parent, which is FormContainer
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid #fff;
`
export const Input = styled.input`
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.2em;
    padding: 0 0 0 5px;
    color: white;
    &::placeholder {
        color: #fff;
    }
    &:hover, &:focus, &:active, &:-webkit-autofill {
        -webkit-text-fill-color: white;
        transition: background-color 5000s ease-in-out 0s;  // This is a trick to keep the background color after the autofill is applied
    }
`

export const SignupButton = styled.button`
    margin-top: 15px;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
    color: #fff;
    background-image: linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61));
`
export const Registery = styled.div`
    font-size: 1rem;
    color: #fff;
    text-align: center;
    margin: 25px 0 10px;
`
export const SignUpLinkContainer = styled.div`
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`

export const ErrorContainer = styled.div`
    text-align: center;
    padding: 5px;
    margin: 0;
    background-color: #FBFFB1;
    border-top: 2px solid #d13128
`