import styled from "styled-components"

import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { useForm } from "react-hook-form"
import apiFetch from "../api/ApiFetch"
import { useState } from "react"
import { DeleteAccountConfirmation } from "./DeleteAccountConfirmation"
import { AccountSettingErrorContainer, AccountSettingItem, AccountSettingLabel, ProfileContainer, ProfileSubmitButtons, ProfileWrapper, SettingInput } from "../styles/AccountSettings"

export function DeleteAccount() {

    const { user } = useContext(UserContext)
    const { register, handleSubmit, formState: {errors} } = useForm()
    const [errorMessages, setErrorMessages] = useState(null)
    const [showDeleteConfirmation, setDeleteConfirmation] = useState(false)


    function onSubmit(data) {
        apiFetch(`/users/${user.id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) {
                res.json().then(message => setErrorMessages(message))
            } 
            else {                
                res.json().then(data => {
                    setErrorMessages(null)
                    setDeleteConfirmation(true)
                })
            }
        })
    }


    return (
        <ProfileContainer>
            <ProfileWrapper onSubmit={handleSubmit(onSubmit)}>
                    {showDeleteConfirmation && ( 
                        <DeleteAccountConfirmation
                        setDeleteConfirmation={setDeleteConfirmation}
                        />
                    )} <AccountSettingItem>
                        <AccountSettingLabel>Password</AccountSettingLabel>
                        <Input 
                            type="password"
                            name="password"
                            {...register("password", {
                                required: "password is required"
                            })}
                        />
                        {errorMessages && errorMessages["incorrect"] &&(
                            <AccountSettingErrorContainer>{errorMessages["incorrect"]}</AccountSettingErrorContainer>
                        )}
                        {errors.password && (
                            <AccountSettingErrorContainer>{errors.password.message}</AccountSettingErrorContainer>
                        )}
                        
                    </AccountSettingItem>
                    <Text>
                        *All the data will be deleted permanently from our server including your profile information and learning data.
                    </Text>
                    <hr/>
                    <AccountSettingItem>
                        <DeleteButtons type="submit" value="Delete Account"/>
                     </AccountSettingItem> 

            </ProfileWrapper>
        </ProfileContainer>
    )
}


const DeleteButtons = styled(ProfileSubmitButtons)`
    background-color: #ff6348;
    background-image: none;
`

const Input = styled(SettingInput)`
    -webkit-text-fill-color: black !important;
`

const Text = styled.p`
    max-width: 260px;
    margin: 6px auto;
    margin-bottom: 48px;
    font-size: 1rem;
    // color: #ff6348;
    white-space: initial;
`

