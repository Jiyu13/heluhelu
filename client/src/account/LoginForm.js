import { useContext } from "react";
import { Marginer } from "./Marginer";
import { BoxContainer, FormContainer, Input, MutedLink, SubmitButton, BoldLink } from "./formStylings";
import { AccountContext } from "./AccountContext";

import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

export function LoginForm(props) {

    const { switchToSignup } = useContext(AccountContext)

    const initialValue =  {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialValue)

    function handleInput(e) {
        const value = e.target.value
        const name = e.targe.name
        setFormData({...formData, [name]: value})
    }
    
    function handleSubmit(e) {
        e.preventDefalut()

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
            if (res.ok) {res.json().then(loginUser)}
        }))
        
    }



    return (
        <BoxContainer>
            <FormContainer id="login-form" onSubmit={handleSubmit}>
                <Input type='text' placeholder="Username" name="username" value="" onChange=""/>
                <Input type='text' placeholder="Password" name="password" value="" onChange=""/>
            </FormContainer>

            <Marginer direction="vertical" margin={10}/>
            {/* reset password */}
            <MutedLink href="#">Forget you password?</MutedLink>

            <Marginer direction="vertical" margin="1.6em"/>
            <SubmitButton type="submit" form="login-form">Signin</SubmitButton>
            

            <Marginer direction="vertical" margin="1em"/>
            <MutedLink href="#">
                Don't have an account?
                <BoldLink href="#" onClick={switchToSignup}>SignUp</BoldLink>
            </MutedLink>

        </BoxContainer>
    )
}