import styled from "styled-components"
import { VocabContainer } from "../stats/Vocabulary"
import { ContainerBody, VocabHeader } from "../stats/VocabularyLists"
import { AccountSettingLabel, SettingInput } from "../styles/AccountSettings"

import X from "../assets/images/cancel_red.svg"
import Tick from "../assets/images/check_circle_green.svg"
import { ErrorContainer, SignupButton } from "../account/formStyles"
import { useState } from "react"
import apiFetch from "../api/ApiFetch"
import { ChangesSave } from "../components/ChangesSave"


export function AdminUserBookList(props) {

    const {userAdmin,userAdminArticles, formData, setFormData} = props
    
    const [isChanged, setChanged] = useState(false)
    const [errors, setErrors] = useState(null)
    const [updatedAdminUser, setUpdatedAdminUser] = useState(null)

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
        setUpdatedAdminUser({...updatedAdminUser, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        setErrors(null)

        console.log(updatedAdminUser)
        apiFetch(`/admin/user/${userAdmin.id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedAdminUser)
        })
        .then(res => {
            if (!res.ok) {
                res.json().then(error =>{
                    console.log(error)
                    setErrors(error)
                })
                

            } else {
                res.json().then(data => {
                    setChanged(true)
                    setTimeout(function() {
                        setChanged(false)
                    }, 2000)

                    setFormData({ 
                        username: data.username,
                        email: data.email,
                        password: ""
                    })
                })
            }
        })
        .then(data => console.log(data))

    }
    

    return (
        <ContainerBody style={{background: "none"}}>
                
            <ChangesSave isChanged={isChanged}/>

            <div style={{backgroundColor: '#FDF8E8'}}>
                <TitleWrapper>
                    <FormTitle>User Info</FormTitle>
                </TitleWrapper>
                
                <AdminForm 
                // style={{maxWidth: "350px"}}
                onSubmit={handleSubmit}
                >
                    <FormItem style={{flexDirection: ""}}>
                        <FormLabel>Username</FormLabel>
                        <FormInput
                            required
                            type="text"
                            name="username"
                            value={formData?.username || ""}
                            onChange={handleChange}
                        />
                        <ul style={{margin: "0", color: "red"}}>
                            {errors && errors["username"] && (
                                <li>
                                    <AdminUserInfoError>
                                        <span>{errors["username"]}</span>
                                    </AdminUserInfoError>
                                </li>
                            )}
                        </ul>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            required
                            type="text"
                            name="email"
                            value={formData?.email || ""}
                            onChange={handleChange}
                        />
                        <ul style={{margin: "0", color: "red"}}>
                            {errors && errors["email_exist"] && (
                                <li>
                                    <AdminUserInfoError>
                                        <span>{errors["email_exist"]}</span>
                                    </AdminUserInfoError>
                                </li>
                            )}
                        </ul>
                    </FormItem>
                    
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            type="text"
                            name="password"
                            value={formData?.password || ""}
                            onChange={handleChange}
                        />
                        <ul style={{margin: "0", color: "red"}}>
                            {errors && errors["capital_letter"] && (
                                <li>
                                    <AdminUserInfoError>
                                        <span>{errors["capital_letter"]}</span>
                                    </AdminUserInfoError>
                                </li>
                            )}
                        
                        
                            {errors && errors["length"] && (
                                <li>
                                    <AdminUserInfoError>
                                        <span>At least 8 characters.</span>
                                    </AdminUserInfoError>
                                </li>
                            )}
                        </ul>
                        
                    </FormItem>
                    
                    <SignupButton style={{width: "120px"}}>
                        Save Changes
                    </SignupButton>

                </AdminForm>
            </div>

            <div style={{backgroundColor: '#FDF8E8'}}>
                <TitleWrapper>
                    <FormTitle>User Book List</FormTitle>
                </TitleWrapper>
                <BookListContainer>
                    <Column>ID</Column>
                    <Column>TITLE</Column>
                    <Column>FINISH?</Column>
                </BookListContainer>
                
                {userAdminArticles?.map((article, index) => {
                    return (
                        <BookListItem key={index} className="admin-book-list-item">
                            <div>{article.id}</div>
                            <div>{article.title}</div>
                            <div>
                                <img 
                                    src={article.check_finished? Tick : X}
                                    alt="article finished status"
                                />    
                            </div>
                        </BookListItem>
                    )
                })}
            
            </div>
        </ContainerBody>
    )
}

const AdminForm = styled.form`
    width: 95%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    margin: auto;
`
const TitleWrapper = styled.div`
    background-image: linear-gradient(to right, rgb(253, 171, 115), rgb(174, 194, 143));
    // background-color: #d1d8e0;
    border-radius: 8px;
    height: 60px;
    display: flex;
    align-items: center;
`
const FormTitle = styled.div`
    font-size: 1.2rem;
    padding: 1rem;
    color: grey;
    font-weight: bold;
`

const FormItem = styled.div``
const FormLabel = styled(AccountSettingLabel)`
    font-weight: normal;
`
const FormInput = styled(SettingInput)`
    height: 2rem;
    &:hover, &:focus, &:active, &:-webkit-autofill {
        -webkit-text-fill-color: black;
        transition: background-color 5000s ease-in-out 0s;  // This is a trick to keep the background color after the autofill is applied
    }
`

const BookListContainer = styled(VocabHeader)`
    grid-template-columns: 0.5fr 4fr 0.5fr;
    padding: 1rem 0.5rem;
`
const Column = styled.div`
    font-weight: bold;
`
const BookListItem = styled(VocabContainer)`
    grid-template-columns: 0.5fr 4fr 0.5fr;
    padding: 1rem 0.5rem;
    gap: 0;
`

const AdminUserInfoError = styled.div`
    margin: 0;
`