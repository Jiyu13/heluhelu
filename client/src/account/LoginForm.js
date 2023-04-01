import { useContext } from "react";
import { Marginer } from "./Marginer";
import { BoxContainer, FormContainer, Input, MutedLink, SubmitButton, BoldLink } from "./formStylings";
import { AccountContext } from "./AccountContext";

import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

export function LoginForm(props) {

    const { switchToSignup } = useContext(AccountContext)
    const { setUser } = useContext(UserContext)


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
        console.log(name, value)
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
                window.alert("Account not Found! Please Sign up first.")
            } else {
                redirectHome()
                res.json().then(user => {
                setUser(user)
                })  
            }
        }))
        
    }
    // const formSchema = yup.object().shape({
    //     username: yup.string().required("Must enter username"),
    //     password: yup.string().required("Must enter a password"),
    // });

    // const formik = useFormik({
    //     initialValues: {
    //         username: "",
    //         password: ""
    //     },
    
    //     validationSchema: formSchema,
    //     onSubmit: (values) => {
    //         fetch("/login", {
    //             method: "POST",
    //             headers: {
    //             "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(values, null, 2),
    //         })
    //         .then((res) => {
    //             if (res.status === 401) {
    //                 console.log("Account not Found! Please Sign up first.")
    //             } else {
    //                 res.json().then(user => {setUser(user)})  
    //             }
    //         });
    //     },
    // });



    return (
        <BoxContainer>
            <FormContainer id="login-form" onSubmit={handleSubmit}>
                <Input 
                    type='text' 
                    placeholder="Username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleInput}
                />
                <Input 
                    type='text' 
                    placeholder="Password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInput}
                />
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