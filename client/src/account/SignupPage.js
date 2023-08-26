import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import apiFetch from "../api/ApiFetch"
import { Link, useNavigate } from "react-router-dom"
import { IconContainer, VisibilityIcon } from "./VisibilityIcon"
import email_white_24dp from '../assets/images/email_white_24dp.svg'
import person_white_24dp from "../assets/images/person_white_24dp.svg"

export function SignupPage( {handleToLogin, ToggleIcon, visible} ) {
    const [usernameError, setUsernameError] = useState(null)
    const [lengthError, setLengthError] = useState(null)
    const [capitalLetterError, setCapitalLetterError] = useState(null)
    const [emailError, setEmailError] = useState(null)

    const { setUser } = useContext(UserContext)
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
        setCapitalLetterError(null)
        setEmailError(null)
        setLengthError(null)
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
                    } else {
                        setLengthError(error["message"][0]["length"])
                        setCapitalLetterError(error["message"][0]["capital_letter"])
                        setEmailError(error["message"][0]["email"])
                    }
                }
                )
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
        <BoxContainer>
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
                        <ErrorContainer>
                            <span>
                                {usernameError}
                            </span>
                        </ErrorContainer>
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
                
                    {emailError && (
                        <ErrorContainer>
                            <span>
                                {emailError}
                            </span>
                        </ErrorContainer>
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
                </InputBox>
                {lengthError && (
                    <ErrorContainer>
                        <span>
                            {lengthError}
                        </span>
                    </ErrorContainer>
                )}
                {capitalLetterError && (
                    <ErrorContainer>
                        <span>
                            {capitalLetterError}
                        </span>
                    </ErrorContainer>
                )}

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
                            onClick={handleToLogin}
                            style={{textDecoration: "none", color: "#fff"}}
                        >
                            Login
                        </Link>
                    </SignUpLinkContainer>
                </Registery>
            </FormContainer>
            
        </BoxContainer>
    )
}

const UserIconContainer = styled(IconContainer)``
const EmailIconContainer = styled(IconContainer)``
const BoxContainer = styled.div`
    position: relative; // relative to its normal position, which is AppContainer
    width: 400px;
    height: 600px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
`

const FormContainer = styled.form`
`

const Title = styled.h2`
    font-size: 2em;
    color: #fff;
    text-align: center;
`

const InputBox = styled.div`
    position: relative; // absolute to its first parent, which is FormContainer
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid #fff;
`
const Input = styled.input`
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
`
const PasswordSuggestion = styled.div`
    margin: -15px 0px 15px;
    // font-size: .9em;
    color: #bdc3c7;
    // display: flex;
    justify-content: center;
`

const SignupButton = styled.button`
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
const Registery = styled.div`
    font-size: .9em;
    color: #fff;
    text-align: center;
    margin: 25px 0 10px;
`
const SignUpLinkContainer = styled.div`
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`

const ErrorContainer = styled.div`
    text-align: center;
    padding: 5px;
    padding-top: 0px;
    margin: 0;
    background-color: #FBFFB1;
    border-top: 2px solid #d13128
`