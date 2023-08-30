import styled from "styled-components"

import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { SubmitButtons } from "../components/Buttons"
import { useForm } from "react-hook-form"
import apiFetch from "../api/ApiFetch"
import { useState } from "react"

export function YourProfile( {setIsChanged} ) {

    const { setUser, user } = useContext(UserContext)
    const { register, handleSubmit, formState: {errors} } = useForm()
    const [errorMessages, setErrorMessages] = useState(null)

    function onSubmit(data) {
        apiFetch(`/${user.id}/check_info`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) {
                res.json().then(errors => setErrorMessages(errors))
            } else {
                setIsChanged(true)
                setErrorMessages(null)
                res.json().then(updatedUser => setUser(updatedUser))
            }
        })
    }
    return (
        <ProfileContainer>
            <ProfileWrapper onSubmit={handleSubmit(onSubmit)}>
                    {/* <ImageButton>
                        <ProfileImage src={logo} alt="profile image"></ProfileImage>
                    </ImageButton> */}
                    {/* <ChangePhoto>Change profile photo</ChangePhoto> */}
                    <Item>
                        <Label>Username</Label>
                        <Input 
                            type="text"
                            name="username"
                            defaultValue={user.username}
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        {errorMessages && errorMessages["username"] && (
                            <ErrorContainer>{errorMessages["username"]}</ErrorContainer>
                        )}
                        {errors.username && (
                            <ErrorContainer>{errors.username.message}</ErrorContainer>
                        )}
                        
                    </Item>
                    <Item>
                        <Label>Email</Label>
                        <Input 
                            type="email"
                            name="email"
                            defaultValue={user.email}
                            {...register("email", {
                                required: "Email is required", 
                                pattern: {
                                    // /^\S+@\S+$/i
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address."
                                    
                                } })}
                            />
                            {errors.email && (
                                <ErrorContainer>{errors.email.message}</ErrorContainer>
                            )}
                            {errorMessages && errorMessages["email"] && (
                                <ErrorContainer>{errorMessages["email"]}</ErrorContainer>
                            )}
                        
                    </Item>
                    <Item>
                        <ProfileSubmitButtons type="submit" value="Save Changes"/>
                     </Item> 

            </ProfileWrapper>
        </ProfileContainer>
    )
}

const ErrorContainer = styled.div`
    color: red;
    font-size: 12px;
    margin-top: -5px;
    margin-bottom: 16px;
`

const ProfileSubmitButtons = styled(SubmitButtons)`
    box-sizing: border-box;
    margin-top: 8px;
    padding: 8px 0;
    width: 100%;
    border-radius: 4px;
    margin-right: 0px;

    &:hover {
        cursor: pointer;
    }
`

const Input = styled.input`
    border-radius: 4px;
    border: 0.5px solid hsl(212.3076923077deg, 8.4967320261%, 70%);
    padding: 8px;
    margin-bottom: 12px;
    width: 100%;
    box-sizing: border-box;
    -webkit-text-fill-color: black !important;
`

const Label = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    margin-top: 6px;
    margin-bottom: 6px;
`

const Item = styled.div`
`

const ProfileWrapper = styled.form`
    margin-top: 20px;
    
`

const ProfileContainer = styled.div`
    box-sizing: border-box;
    width: 80%;
`

// const ChangePhoto = styled.div`
//     font-size: 12px;
//     font-weight: bold;
//     margin-top: 6px;
//     color: #3498db;
//     cursor: pointer;
// `

// const ProfileImage = styled.img`
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     background-color: black;
//     margin-right: 8px;
// `

// const ImageButton = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     border: 0;
//     cursor: pointer;
//     height: 100%;
//     padding: 0;
//     width: 92%;
//     background-color: none;
// `

// const PageTitle = styled.h2``

