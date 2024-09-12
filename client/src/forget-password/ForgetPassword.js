import styled from "styled-components";
import { 
    BoxContainer, FormContainer, Title, InputBox, Input, Registery, SignupButton, 
    ErrorContainer
} from "../account/formStyles";
import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import apiFetch from "../api/ApiFetch";
import { ResetEmailSent } from "./ResetEmailSent";
import { AppContainer } from "../components/App";
import { UserContext } from "../components/UserContext";


export function ForgetPassword() {

    const {user} = useContext(UserContext)

    const initialEmail = {email: ""}

    const [formData, setFormData] = useState(initialEmail)
    const [emailNotExistError, setEmailNotExistError] = useState(null)
    const [emailFormatError, setEmailFormatError] = useState(null)
    const [emailSent, setEmailSent] = useState(null)


    function handleInput(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        const resetEmail = {email: formData.email}
        apiFetch(`/reset_request`, {
            method: "POST",
            // mode: "cors",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(resetEmail)
        })
        .then(res => {
            console.log(res)
            if (res.status === 404) {
                res.json().then(error => {
                    if (error["email_exist"]) {
                        setEmailFormatError(null)
                        setEmailNotExistError(error["email_exist"])
                    }
                    if (error["email_format"]) {
                        console.log("email format")
                        setEmailNotExistError(null)
                        setEmailFormatError(error["email_format"])
                    }
                })
            } else {
                res.json().then(data => {
                    setEmailSent(data['msg'])
                })
            }
        })
    }


    return (
        <>
            {!user && (
                <AppContainer>
                    <BoxContainer>
                        {emailSent ? 

                            <ResetEmailSent emailSent={emailSent}/> 
                            :
                            <FormContainer onSubmit={handleSubmit} style={{paddingBottom: "8rem"}}>
                            
                            
                                <Title>Forget Password?</Title>
                                <Registery>
                                    <p>Enter your email to reset your password.</p>
                                </Registery>

                                <InputBox>
                                    <Input 
                                        required 
                                        type="text" 
                                        placeholder="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInput}
                                    />
                                    {emailNotExistError && (
                                        <ErrorContainer>
                                            <span>
                                                {emailNotExistError}
                                            </span>
                                        </ErrorContainer>
                                    )}

                                    {emailFormatError && (
                                        <ErrorContainer>
                                            <span>
                                                {emailFormatError}
                                            </span>
                                        </ErrorContainer>
                                    )}
                                </InputBox>

                                <SignupButton>Reset Password</SignupButton>

                                
                            </FormContainer>

                            
                        }
                        
                        <LinksContainer>
                            <Link 
                                to="/login" 
                                style={{color: "white"}}
                            >
                                Login
                            </Link>

                            <Link 
                                to="/signup" 
                                style={{color: "white"}}
                            >
                                Signup
                            </Link>
                        </LinksContainer>

                    </BoxContainer>
                </AppContainer>
            )}
        </> 
        
    )
}

const LinksContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 40px 0px 10px;
    gap: 25px;
    position: absolute;
    width: 100%;
    bottom: 1rem;
`