import { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import { Marginer } from "./Marginer";
import { BoxContainer, FormContainer, Input, MutedLink, SubmitButton, BoldLink, ErrorContainer } from "./formStylings";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

export function SignupForm() {

    const { switchToLogin } = useContext(AccountContext)
    const { setUser , errors, setErrors } = useContext(UserContext)


    let navigate = useNavigate()
    function redirectHome() {
        navigate('/')
    }

    const initialValue =  {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialValue)

    function handleInput(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }
    
    function handleSubmit(e) {
        e.preventDefault();

        const signupUser = {
            username: formData.username,
            password: formData.password
        }

        fetch('/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signupUser)
        })
        .then((res => {
            if (res.status === 201) {
                res.json().then(user => {
                    setUser(user)
                    redirectHome()
                }) 
            } else if (res.status === 422) {
                res.json().then(error => {
                    // window.alert(error["message"])
                    setErrors(error["message"])
                })
                setTimeout(function() {
                    setErrors(null)
                }, 5000)
                
            }
        }))
        
    }

    return (
        <BoxContainer>
            <FormContainer id="signup-form" onSubmit={handleSubmit}>
                <Input
                    required   
                    type='text' 
                    placeholder="Username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleInput}
                />
                <Input 
                    required
                    type='text' 
                    placeholder="Password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInput}
                />

                {errors && (<ErrorContainer>{errors}</ErrorContainer>)}
            </FormContainer>

            <Marginer direction="vertical" margin={10}/>
            <SubmitButton type="submit" form="signup-form">Signup</SubmitButton>

            <Marginer direction="vertical" margin="1em"/>
            <MutedLink href="#">
                Already have an account? 
                <BoldLink href="#" onClick={switchToLogin}>Login</BoldLink>
            </MutedLink>

        </BoxContainer>
    )
}
