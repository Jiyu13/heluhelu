import styled from "styled-components"
import { VocabContainer } from "../stats/Vocabulary"
import { ContainerBody, VocabHeader } from "../stats/VocabularyLists"
import { AccountSettingLabel, SettingInput } from "../styles/AccountSettings"

import X from "../assets/images/cancel_red.svg"
import Tick from "../assets/images/check_circle_green.svg"


export function AdminUserBookList(props) {

    const {userAdmin,userAdminArticles} = props

    

    return (
        <ContainerBody style={{background: "none"}}>
                
            <div style={{backgroundColor: '#FDF8E8'}}>
                <TitleWrapper>
                    <FormTitle>User Info</FormTitle>
                </TitleWrapper>
                
                <AdminForm 
                // style={{maxWidth: "350px"}}
                >
                    <FormItem style={{flexDirection: ""}}>
                        <FormLabel>Username</FormLabel>
                        <FormInput
                            type="text"
                            name="username"
                            defaultValue={userAdmin?.username}
                        />
                    </FormItem>
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            type="text"
                            name="email"
                            defaultValue={userAdmin?.email}
                        />
                    </FormItem>
                    
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormInput/>
                    </FormItem>

                </AdminForm>
            </div>

            <div style={{backgroundColor: '#FDF8E8'}}>
                <TitleWrapper>
                    <FormTitle>User Book list</FormTitle>
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