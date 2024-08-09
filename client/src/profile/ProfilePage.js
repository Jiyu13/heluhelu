import styled from "styled-components"
import { YourProfile } from "./YourProfile"
import { useState } from "react"
import { ProfileNavbar } from "./ProfileNavbar"
import { ChangesSave } from "../components/ChangesSave"
import { ChangePassword } from "./ChangePassword"
import { DeleteAccount } from "./DeleteAccount"
import { PageContainer } from "../styles/Container"

export function ProfilePage() {

    const [page, setPage] = useState("profile")
    const [isChanged, setIsChanged] = useState(false)


    return (
        <ProfilePageContainer>
            <PageWrapper>
                {isChanged && (
                    <ChangesSave isChanged={isChanged}/>
                )}
                <ProfileHeader>
                    <h2>Account</h2>
                    <p style={{fontSize: "1rem"}}>Set your account settings down below</p>
                    
                    <ProfileNavbar page={page} setPage={setPage} setIsChanged={setIsChanged}/>
                </ProfileHeader>
                <ProfileBody>
                    {page === "profile" && (
                        <YourProfile setIsChanged={setIsChanged}/>
                    )}
                    {page === "change_password" && (
                        <ChangePassword setIsChanged={setIsChanged}/>
                    )}
                    {page === "delete_account" && (
                        <DeleteAccount setIsChanged={setIsChanged}/>
                    )}

                </ProfileBody>
            </PageWrapper>

        </ProfilePageContainer>

    )
}

const ProfileBody = styled.div`
    display: flex;
    justify-content: center;
`
const ProfileHeader = styled.div``
const PageWrapper = styled.div`
    max-width: 600px;
    margin: auto 20px;
`
const ProfilePageContainer = styled(PageContainer)`
    box-sizing: border-box;
    display:flex;
    justify-content: center;
    // height: 100vh;
`
