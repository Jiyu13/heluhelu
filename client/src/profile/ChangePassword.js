import styled from "styled-components"

import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { SubmitButtons } from "../components/Buttons"
import { useForm } from "react-hook-form"
import apiFetch from "../api/ApiFetch"
import { useState } from "react"

export function ChangePassword( {setIsChanged} ) {

    const { user } = useContext(UserContext)
    const { register, handleSubmit, formState: {errors}, reset } = useForm()
    const [errorMessages, setErrorMessages] = useState(null)

    function onSubmit(data) {
        apiFetch(`/${user.id}/change_password`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) {
                res.json().then(message => 
                    setErrorMessages(message)
                )
            } 
            else {
                setIsChanged(true)
                setErrorMessages(null)
                // res.json().then(updatedUser => setUser(updatedUser))
            }
        })
        reset()

    }


    return (
        <ProfileContainer>
            <ProfileWrapper onSubmit={handleSubmit(onSubmit)}>
                    <Item>
                        <Label>Old password</Label>
                        <Input 
                            type="password"
                            name="old_password"
                            // defaultValue={user.}
                            {...register("old_password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.old_password && (
                            <ErrorContainer>{errors.old_password.message}</ErrorContainer>
                        )}
                        {errorMessages && errorMessages["incorrect"] && (
                            <ErrorContainer>{errorMessages["incorrect"]}</ErrorContainer>
                        )}
                    </Item>
                    <Item>
                        <Label>New password</Label>
                        <PasswordConstrains >
                            <ConstrainItem style={{color: errorMessages && errorMessages["length"] ? "red": "#747d8c"}}>
                                is 8 characters or longer.
                            </ConstrainItem> 
                            <ConstrainItem style={{color: errorMessages && errorMessages["capital_letter"] ? "red": "#747d8c"}}>
                                contains at least one capital letter.
                            </ConstrainItem>
                        </PasswordConstrains>
                        <Input 
                            type="password"
                            name="new_password"
                            // defaultValue={user.email}
                            {...register("new_password", {
                                required: "password is required"
                            })}
                        />
                        {errors.new_password && (
                            <ErrorContainer>{errors.new_password.message}</ErrorContainer>
                        )}
                        
                    </Item>

                    <Item>
                        <Label>Confirm password</Label>
                        <Input 
                            type="password"
                            name="confirm_password"
                            // defaultValue={user.email}
                            {...register("confirm_password", {
                                required: "password is required"
                            })}
                        />
                        {errors.confirm_password && (
                            <ErrorContainer>{errors.confirm_password.message}</ErrorContainer>
                        )}
                        {errorMessages && errorMessages["not_match"] && (
                            <ErrorContainer>{errorMessages["not_match"]}</ErrorContainer>
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

const ConstrainItem = styled.li`
    font-size: 12px;
`

const PasswordConstrains =  styled.ul`
    margin-top: 0px;
    margin-bottom: 6px;
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

