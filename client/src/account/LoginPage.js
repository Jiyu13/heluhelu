import { useContext, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import apiFetch from "../api/ApiFetch"
import { Link, useNavigate } from "react-router-dom"
import { VisibilityIcon } from "./VisibilityIcon"



export function LoginPage( {handleToSignup, errors, setErrors, ToggleIcon, visible} ) {
    const { setUser } = useContext(UserContext)
    // const [showPassword, setShowPasswprd] = useState("password")

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
                res.json().then(error =>
                    setErrors(error["message"])
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
                <Title>Login</Title>
                
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
                        placeholder="Username" 
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
                    <ForgetPasswordLink to="#">Forget your password?</ForgetPasswordLink>
                </ForgetPassword>
                <LoginButton>Login</LoginButton>

                <Registery>
                    <p>Don't have an account?</p>
                    <SignUpLink>
                        <Link 
                            to="/signup" 
                            onClick={handleToSignup}
                            style={{textDecoration: "none", color: "#fff"}}
                        >
                            SignUp
                        </Link>
                    </SignUpLink>
                </Registery>
            </FormContainer>
            
        </BoxContainer>
    )
}


const BoxContainer = styled.div`
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
const ForgetPassword = styled.div`
    margin: -15px 0px 15px;
    font-size: .9em;
    color: #fff;
    display: flex;
    justify-content: center;
`

const ForgetPasswordLink = styled.a`
    margin-right: 3px;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`
const LoginButton = styled.button`
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
const SignUpLink = styled.div`
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`

const ErrorContainer = styled.div`
    text-align: center;
    padding: 5px;
    margin: 0;
    background-color: #FBFFB1;
    border-top: 2px solid #d13128
`
