import { useContext, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../components/UserContext"
import apiFetch from "../api/ApiFetch"
import { Link, redirect, useNavigate } from "react-router-dom"

export function SignupPage( {handleToLogin} ) {
    const { setUser, errors, setErrors } = useContext(UserContext)

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
                setTimeout(function() {
                    setErrors(null)
                }, 5000)
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
                    <Input 
                        required 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInput}
                    />
                </InputBox>
                {errors && (<ErrorContainer>{errors}</ErrorContainer>)}

                <PasswordSuggestion>
                    <Text>Must contaib</Text>
                </PasswordSuggestion>
                <LoginButton>Create Account</LoginButton>

                <Registery>
                    <p>Already have an account?</p>
                    <SignUpLink >
                        <Link 
                            to="/login" 
                            onClick={handleToLogin}
                            style={{textDecoration: "none", color: "#fff"}}
                        >
                            Login
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
    width: 100px;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.2em;
    padding: 0 35px 0 5px;
    color: #fff;
`
const PasswordSuggestion = styled.div`
    margin: -15px 0px 15px;
    font-size: .9em;
    color: #fff;
    display: flex;
    justify-content: center;
`

const Text = styled.p`
    margin-right: 3px;
    color: #fff;
`
const LoginButton = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
`
const Registery = styled.div`
    font-size: .9em;
    color: #fff;
    text-align: center;
    margin: 25px 0 10px;
`
const SignUpLink = styled.a`
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`

const ErrorContainer = styled.div``