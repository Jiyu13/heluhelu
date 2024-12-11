import { useContext, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import apiFetch from "../api/ApiFetch"
import { Link, useNavigate } from "react-router-dom"
import { VisibilityIcon } from "./VisibilityIcon"

import { 
    BoxContainer, FormContainer, Title, InputBox, Input, SignupButton, Registery, SignUpLinkContainer,
    ErrorContainer
} from "./formStyles"
import { AppContainer, EmptyDiv } from "../components/App"
import { LoginPageLogo } from "../components/LoginPageLogo"


import logo_white from "../assets/images/logo/heluhelulogo_white.png"


export function LoginPage() {
    
    const { user, setUser } = useContext(UserContext)
    const [errors, setErrors] = useState(null)
    const [visible, setVisible] = useState(false)

    function ToggleIcon() {
        setVisible(!visible)
    }


    const inputType = visible ?  "text" : "password"

    const initialValue = {
        username: "",
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

        const loginUser = {
            username: formData.username,
            password: formData.password
        }

        apiFetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginUser)
        })
        .then(res => {
            if (res.status === 401) {
                res.json().then(error => {
                    console.log(error)
                    setErrors(error["message"])
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
                <AppContainer className="app-container">

                    {
                        errors && (
                            <EmptyDiv onClick={() => setErrors(null)}/>

                        )
                    }
                    <BoxContainer className="box-container">
                        <FormContainer onSubmit={handleSubmit}>

                            <LoginPageLogo />

                            {/* <Title>Login</Title> */}
                            
                            {errors && (
                                <ErrorContainer>
                                    <span>
                                        {errors}
                                    </span>
                                </ErrorContainer>
                            )}
        
                            <InputBox>
                                <Input 
                                    required 
                                    type="text" 
                                    placeholder="Username or email" 
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInput}
                                />
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
                            
                            <ForgetPassword>
                                <Link 
                                    to="/account/recover" 
                                    style={{textDecoration: "none", color: "#fff"}}
                                >
                                    Forget your password?
                                </Link>
                            </ForgetPassword>
                            
                            <SignupButton>Login</SignupButton>
        
                            <Registery>
                                <p>Don't have an account?</p>
                                <SignUpLinkContainer>
                                    <Link 
                                        to="/signup" 
                                        style={{textDecoration: "none", color: "#fff"}}
                                    >
                                        SignUp
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

const ForgetPassword = styled.div`
    margin: -15px 0px 15px;
    font-size: .8rem;
    color: #fff;
    display: flex;
    justify-content: center;
    &:hover {
        text-decoration: underline;
    }
`
