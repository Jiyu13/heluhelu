import styled from "styled-components"

import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { SubmitButtons } from "../styles/Buttons"
import { useForm } from "react-hook-form"
import apiFetch from "../api/ApiFetch"
import { useState } from "react"
import { VisibilityIcon } from "./ProfileVisibilityIcon"
import visibility_black_24dp from "../assets/images/black/visibility_black_24dp.svg"
import visibility_off_black_24dp from "../assets/images/black/visibility_off_black_24dp.svg"
import { AccountSettingErrorContainer, AccountSettingItem, AccountSettingLabel, ProfileContainer, ProfileSubmitButtons, ProfileWrapper, SettingInput } from "../styles/AccountSettings"


export function ChangePassword( {setIsChanged} ) {

    const { user } = useContext(UserContext)
    const { register, handleSubmit, formState: {errors}, reset } = useForm()
    const [errorMessages, setErrorMessages] = useState(null)
    const [visibleOld, setVisibleOld] = useState(false)
    const [visibleNew, setVisibleNew] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false)

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

    function ToggleIconOld() {
        setVisibleOld(!visibleOld)
    }

    function ToggleIconNew() {
        setVisibleNew(!visibleNew)
    }
    function ToggleIconConfirm() {
        setVisibleConfirm(!visibleConfirm)
    }
    return (
        <ProfileContainer>
            <ProfileWrapper onSubmit={handleSubmit(onSubmit)}>
                    <Item>
                        <AccountSettingLabel>Old password</AccountSettingLabel>
                        <VisibilityIconBlack
                            ToggleIcon={ToggleIconOld} 
                            visible={visibleOld} 
                            canSee={visibility_black_24dp}
                            cannotSee={visibility_off_black_24dp}
                        />
                        <Input 
                            type={visibleOld ?  "text" : "password"}
                            // defaultValue={user.}
                            {...register("old_password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.old_password && (
                            <AccountSettingErrorContainer>{errors.old_password.message}</AccountSettingErrorContainer>
                        )}
                        {errorMessages && errorMessages["incorrect"] && (
                            <AccountSettingErrorContainer>{errorMessages["incorrect"]}</AccountSettingErrorContainer>
                        )}
                    </Item>
                    <Item>
                        <AccountSettingLabel>New password</AccountSettingLabel>
                        <PasswordConstrains >
                            <ConstrainItem style={{color: errorMessages && errorMessages["length"] ? "red": "#747d8c"}}>
                                is 8 characters or longer.
                            </ConstrainItem> 
                            <ConstrainItem style={{color: errorMessages && errorMessages["capital_letter"] ? "red": "#747d8c"}}>
                                contains at least one capital letter.
                            </ConstrainItem>
                        </PasswordConstrains>
                        <VisibilityIconBlack 
                            ToggleIcon={ToggleIconNew} 
                            visible={visibleNew} 
                            canSee={visibility_black_24dp}
                            cannotSee={visibility_off_black_24dp}
                        />
                        <Input 
                            type={visibleNew ?  "text" : "password"}
                            // defaultValue={user.email}
                            {...register("new_password", {
                                required: "password is required"
                            })}
                        />
                        {errors.new_password && (
                            <AccountSettingErrorContainer>{errors.new_password.message}</AccountSettingErrorContainer>
                        )}
                        
                    </Item>

                    <Item>
                        <AccountSettingLabel>Confirm password</AccountSettingLabel>
                        <VisibilityIconBlack 
                            ToggleIcon={ToggleIconConfirm} 
                            visible={visibleConfirm} 
                            canSee={visibility_black_24dp}
                            cannotSee={visibility_off_black_24dp}
                        />
                        <Input 
                            type={visibleConfirm ?  "text" : "password"}
                            name="confirm_password"
                            // defaultValue={user.email}
                            {...register("confirm_password", {
                                required: "password is required"
                            })}
                        />
                        {errors.confirm_password && (
                            <AccountSettingErrorContainer>{errors.confirm_password.message}</AccountSettingErrorContainer>
                        )}
                        {errorMessages && errorMessages["not_match"] && (
                            <AccountSettingErrorContainer>{errorMessages["not_match"]}</AccountSettingErrorContainer>
                        )}
                    </Item>
                    <Item>
                        <ProfileSubmitButtons type="submit" value="Save Changes"/>
                     </Item> 

            </ProfileWrapper>
        </ProfileContainer>
    )
}

const VisibilityIconBlack = styled(VisibilityIcon)``

const Input = styled(SettingInput)`
    // border-radius: 4px;
    // border: 0.5px solid hsl(212.3076923077deg, 8.4967320261%, 70%);
    // padding: 8px;
    // margin-bottom: 12px;
    // width: 100%;
    // box-sizing: border-box;
    -webkit-text-fill-color: black !important;
    // background-color: rgba(255, 255, 255, 0.9);
`


const Item = styled(AccountSettingItem)`
    position: relative;
`


const ConstrainItem = styled.li`
    font-size: 1rem;
`

const PasswordConstrains =  styled.ul`
    margin-top: 0px;
    margin-bottom: 6px;
`
