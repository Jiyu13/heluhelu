import styled from "styled-components"

import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { useForm } from "react-hook-form"
import apiFetch from "../api/ApiFetch"
import { useState } from "react"
import { AccountSettingErrorContainer, AccountSettingItem, AccountSettingLabel, Item, ProfileContainer, ProfileSubmitButtons, ProfileWrapper, SettingInput } from "../styles/AccountSettings"

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
                    <AccountSettingItem>
                        <AccountSettingLabel>Username</AccountSettingLabel>
                        <Input 
                            type="text"
                            name="username"
                            defaultValue={user.username}
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        {errorMessages && errorMessages["username"] && (
                            <AccountSettingErrorContainer>{errorMessages["username"]}</AccountSettingErrorContainer>
                        )}
                        {errors.username && (
                            <AccountSettingErrorContainer>{errors.username.message}</AccountSettingErrorContainer>
                        )}
                        
                    </AccountSettingItem>
                    <AccountSettingItem>
                        <AccountSettingLabel>Email</AccountSettingLabel>
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
                                <AccountSettingErrorContainer>{errors.email.message}</AccountSettingErrorContainer>
                            )}
                            {errorMessages && errorMessages["email"] && (
                                <AccountSettingErrorContainer>{errorMessages["email"]}</AccountSettingErrorContainer>
                            )}
                        
                    </AccountSettingItem>
                    <AccountSettingItem>
                        <ProfileSubmitButtons type="submit" value="Save Changes"/>
                     </AccountSettingItem> 

            </ProfileWrapper>
        </ProfileContainer>
    )
}


const Input = styled(SettingInput)`
    &:hover, &:focus, &:active, &:-webkit-autofill {
        -webkit-text-fill-color: black;
        transition: background-color 5000s ease-in-out 0s;  // This is a trick to keep the background color after the autofill is applied
    }
`

