import { useContext } from "react";
import { Marginer } from "./Marginer";
import { BoxContainer, FormContainer, Input, MutedLink, SubmitButton, BoldLink, ErrorContainer } from "./formStylings";
import { AccountContext } from "./AccountContext";


import { useState } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

export function LoginForm(props) {

    const { switchToSignup } = useContext(AccountContext)
    const { setUser, errors, setErrors } = useContext(UserContext)


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

        const loginUser = {
            username: formData.username,
            password: formData.password
        }

        fetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginUser)
        })
        .then((res => {
            if (res.status === 401) {
                res.json().then(error => 
                    // window.alert(error['message'])
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
        }))
        
    }

    console.log(errors)

    return (
        <BoxContainer>
            <FormContainer id="login-form" onSubmit={handleSubmit}>
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
            {/* reset password */}
            <MutedLink href="#">Forget you password?</MutedLink>

            <Marginer direction="vertical" margin="1.6em"/>
            <SubmitButton type="submit" form="login-form">Login</SubmitButton>
            

            <Marginer direction="vertical" margin="1em"/>
            <MutedLink href="#">
                Don't have an account?
                <BoldLink href="#" onClick={switchToSignup}>SignUp</BoldLink>
            </MutedLink>

        </BoxContainer>
    )
}


// const ErrorContainer = styled.div`
//     color: red;
//     text-align:center;
// `