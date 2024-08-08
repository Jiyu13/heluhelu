import { useContext, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import apiFetch from "../api/ApiFetch"
import { Link, useNavigate } from "react-router-dom"
import { IconContainer, VisibilityIcon } from "./VisibilityIcon"
import email_white_24dp from '../assets/images/white/email_white_24dp.svg'
import person_white_24dp from "../assets/images/white/person_white_24dp.svg"

import { 
    BoxContainer, FormContainer, Title, InputBox, Input, SignupButton, Registery, SignUpLinkContainer,
    ErrorContainer
} from "./formStyles"
import { AppContainer, EmptyDiv } from "../components/App"


export function SignupPage() {
    const [usernameError, setUsernameError] = useState(null)
    const [lengthError, setLengthError] = useState(null)
    const [capitalLetterError, setCapitalLetterError] = useState(null)
    const [emailExistError, setEmailExistError] = useState(null)
    const [emailFormatError, setEmailFormatError] = useState(null)
    const [errors, setErrors] = useState(null)
    const [visible, setVisible] = useState(false)

    function ToggleIcon() {
        setVisible(!visible)
    }


    const { user, setUser } = useContext(UserContext)
    const inputType = visible ?  "text" : "password"

    const initialValue = {
        username: "",
        email: "",
        password: "",
    }

    const [formData, setFormData] = useState(initialValue)

    function handleInput(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        setUsernameError(null)
        setLengthError(null)
        setCapitalLetterError(null)
        setEmailFormatError(null)
        setEmailExistError(null)
        
        const loginUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }

        apiFetch('/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginUser)
        })
        .then(res => {
            if (res.status === 422) {
                res.json().then(error =>{
                    if (error["username"]){
                        setUsernameError(error["username"])
                    } 
                    if (error["email_exist"]) {
                        setEmailExistError(error["email_exist"])
                    }
                    if (error["length"]) {
                        setLengthError(error["length"])
                    }
                    if (error["capital_letter"]) {
                        setCapitalLetterError(error["capital_letter"])
                    }
                    if (error["email_format"]) {
                        setEmailFormatError(error["email_format"])
                    }
                })
            } else {
                res.json().then(user => {
                    setUser(user)
                    redirectHome()
                })
            }
        })
    }

    //  ========= go to home page after loging successfully ==============
    let navigate = useNavigate()
    function redirectHome() {
        navigate('/') 
    }

    return (
        <>
        {!user && (
            <AppContainer>
                {
                    errors && (
                        <EmptyDiv onClick={() => setErrors(null)}/>

                    )
                }
                <BoxContainer style={{height: "650px"}}>
                    <FormContainer onSubmit={handleSubmit}>
                        <Title>Sign Up</Title>

                        <InputBox>
                            <UserIconContainer>
                                <img src={person_white_24dp} alt="user icon"/>
                            </UserIconContainer>
                            <Input 
                                required 
                                type="text" 
                                placeholder="Username" 
                                name="username"
                                value={formData.username}
                                onChange={handleInput}
                            />
                            
                            {usernameError && (
                                <SignupErrorContainer>
                                    <span>
                                        {usernameError}
                                    </span>
                                </SignupErrorContainer>
                            )}
                        </InputBox>
                        <InputBox>
                            <EmailIconContainer>
                                <img src={email_white_24dp} alt="email icon"/>
                            </EmailIconContainer>
                            
                            <Input 
                                required 
                                type="text"
                                placeholder="Email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInput}
                            />
                        
                            {emailFormatError && (
                                <SignupErrorContainer>
                                    <span>
                                        {emailFormatError}
                                    </span>
                                </SignupErrorContainer>
                            )}
                            {emailExistError && (
                                <SignupErrorContainer>
                                    <span>
                                        {emailExistError}
                                    </span>
                                </SignupErrorContainer>
                            )}
                        </InputBox>

                        <InputBox>
                            <VisibilityIcon ToggleIcon={ToggleIcon} visible={visible}/>
                            <Input 
                                required 
                                type={inputType}
                                placeholder="Password" 
                                name="password"
                                value={formData.password}
                                onChange={handleInput}
                            />
                        
                            {lengthError && (
                                <SignupErrorContainer>
                                    <span>
                                        {lengthError}
                                    </span>
                                </SignupErrorContainer>
                            )}
                            {capitalLetterError && (
                                <SignupErrorContainer>
                                    <span>
                                        {capitalLetterError}
                                    </span>
                                </SignupErrorContainer>
                            )}
                        </InputBox>

                        <PasswordSuggestion>
                            <h4 style={{marginBottom: "7px"}}>Make sure your password:</h4>
                            <ul style={{marginTop: "0px"}}>
                                
                                <li>is 8 characters or longer</li> 
                                <li>contains at least one capital letter</li>
                                {/* <li>contain at least one of these: !@#$%^&*</li> */}
                            </ul>
                        </PasswordSuggestion>
                        <SignupButton>Create Account</SignupButton>

                        <Registery>
                            <p>Already have an account?</p>
                            <SignUpLinkContainer >
                                <Link 
                                    to="/login" 
                                    style={{textDecoration: "none", color: "#fff"}}
                                >
                                    Login
                                </Link>
                            </SignUpLinkContainer>
                        </Registery>
                    </FormContainer>
                    
                </BoxContainer>
            </AppContainer>
)}
        </>
        
    )
}

const UserIconContainer = styled(IconContainer)``
const EmailIconContainer = styled(IconContainer)``
const PasswordSuggestion = styled.div`
    margin: -15px 0px 15px;
    color: #bdc3c7;
    justify-content: center;
`

const SignupErrorContainer = styled(ErrorContainer)`
    padding-top: 0px;
`