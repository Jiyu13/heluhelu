import { useContext, useState } from "react";
import { VisibilityIcon } from "../account/VisibilityIcon";
import { BoxContainer, ErrorContainer, FormContainer, Input, InputBox, SignupButton, Title } from "../account/formStyles";
import styled from "styled-components";
import { UserContext } from "../components/UserContext";
import { EmptyDiv } from "../components/App";
import apiFetch from "../api/ApiFetch";
import { Link, useLocation, useParams } from "react-router-dom";


export function ResetPasswordForm() {

    const { user } = useContext(UserContext)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [errors, setErrors] = useState(false)
    const [lengthError, setLengthError] = useState(null)
    const [capitalLetterError, setCapitalLetterError] = useState(null)
    const [passwordNotMatch, setPasswordNotMatch] = useState(null)
    const [tokenExpired, setTokenExpired] = useState(null)
    const [resetSuccess, setResetSuccess] = useState(null)
    

    const {token} = useParams()

    const inputType = visible ?  "text" : "password"
    const inputType2 = visible2 ?  "text" : "password"

    const initialValues = {
        "password": "",
        "confirm_password" : ""
    }

    const [formData, setFormData] = useState(initialValues)

    function ToggleIcon() {
        setVisible(!visible)
    }

    function ToggleIcon2() {
        setVisible2(!visible2)
    }

    function handleInput(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLengthError(null)
        setCapitalLetterError(null)
        setPasswordNotMatch(null)

        const newPassword = {
            password: formData.password,
            confirm_password: formData.confirm_password

        }
        apiFetch('/password_reset', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newPassword)
        })
        .then(res => {
            if (!res.ok) {
                res.json().then(error => {
                    setErrors(true)
                    if (error["length"]) {
                        setLengthError(error["length"])
                    }
                    if (error["capital_letter"]) {
                        setCapitalLetterError(error["capital_letter"])
                    }
                    if (error["not_match"]) {
                        setPasswordNotMatch(error["not_match"])
                    }
                    if (error["msg"]) {
                        setTokenExpired('Reset link has expired.')
                    }
                })
            } 

            else {
                res.json().then(data => {
                    setResetSuccess(data['message'])
                    setFormData(initialValues)
                })
            }
        })
    }

    return (
        <>
            {!user && (
                <AppContainer>

                {
                    errors && (
                        <EmptyDiv
                            className='empty-layer'
                            onClick={() => setErrors(false)}
                        />

                    )
                }

                <BoxContainer>
                    <FormContainer onSubmit={handleSubmit} style={{paddingBottom: "4rem"}}>
                        <Title>Set New Password</Title>
                        
                        {lengthError && errors && (
                            <ErrorContainer>
                                <span>
                                    {lengthError}
                                </span>
                            </ErrorContainer>
                        )}
                        {capitalLetterError && errors && (
                            <ErrorContainer>
                                <span>
                                    {capitalLetterError}
                                </span>
                            </ErrorContainer>
                        )}
                        {passwordNotMatch && errors && (
                            <ErrorContainer>
                                <span>
                                    {passwordNotMatch}
                                </span>
                            </ErrorContainer>
                        )}
                        {tokenExpired && errors && (
                            <ErrorContainer>
                                <span>
                                    {tokenExpired}
                                </span>
                            </ErrorContainer>
                        )}
                        {resetSuccess && !errors && (
                            <ErrorContainer>
                                <span>
                                    {resetSuccess}
                                </span>
                            </ErrorContainer>
                        )}
    
                        <InputBox>
                            <VisibilityIcon ToggleIcon={ToggleIcon} visible={visible}/>
                            <Input 
                                required 
                                type={inputType}
                                placeholder="New Password" 
                                name="password"
                                value={formData.password}
                                onChange={handleInput}
                            />
                        </InputBox>
                        <InputBox>
                            <VisibilityIcon ToggleIcon={ToggleIcon2} visible={visible2}/>
                            <Input 
                                required 
                                type={inputType2} 
                                placeholder="Confirm Password" 
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleInput}
                            />
                        </InputBox>
                        
                        
                        <SignupButton>Set password</SignupButton>
    
                    </FormContainer>

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

const AppContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;

    background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top,  rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg,  #670d10 0%, #092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756',GradientType=1 );
`;

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