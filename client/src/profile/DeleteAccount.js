import styled from "styled-components"

import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { SubmitButtons } from "../components/Buttons"
import { useForm } from "react-hook-form"
import apiFetch from "../api/ApiFetch"
import { useState } from "react"
import { DeleteAccountConfirmation } from "./DeleteAccountConfirmation"

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
                    )} <Item>
                        <Label>password</Label>
                        <Input 
                            type="password"
                            name="password"
                            {...register("password", {
                                required: "password is required"
                            })}
                        />
                        {errorMessages && errorMessages["incorrect"] &&(
                            <ErrorContainer>{errorMessages["incorrect"]}</ErrorContainer>
                        )}
                        {errors.password && (
                            <ErrorContainer>{errors.password.message}</ErrorContainer>
                        )}
                        
                    </Item>
                    <Text>
                        *All the data will be deleted permanently from our server including your profile information and learning data.
                    </Text>
                    <hr/>
                    <Item>
                        <DeleteButtons type="submit" value="Delete Account"/>
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

const DeleteButtons = styled(SubmitButtons)`
    box-sizing: border-box;
    margin-top: 8px;
    padding: 8px 0;
    width: 100%;
    border-radius: 4px;
    margin-right: 0px;
    background-color: #ff6348;
    background-image: none;
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

const Text = styled.p`
    max-width: 260px;
    margin: 6px auto;
    margin-bottom: 48px;
    font-size: 12px;
    // color: #ff6348;
    white-space: initial;
`

