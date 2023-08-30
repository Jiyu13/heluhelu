import styled from "styled-components"
import { YourProfile } from "./YourProfile"
import { useState } from "react"
import { ProfileNavbar } from "./ProfileNavbar"
import { ChangesSave } from "../components/ChangesSave"

export function ProfilePage() {

    const [page, setPage] = useState("profile")
    const [isChanged, setIsChanged] = useState(false)


    return (
        <PageContainer>
            <PageWrapper>
                {isChanged && (
                    <ChangesSave isChanged={isChanged}/>
                )}
                <ProfileHeader>
                    <h3>Account</h3>
                    <p>Set your account settings down below</p>
                    
                    <ProfileNavbar page={page} setPage={setPage}/>
                </ProfileHeader>
                <ProfileBody>

                    {page === "profile" && (
                        <YourProfile setIsChanged={setIsChanged}/>
                    )}
                </ProfileBody>
            </PageWrapper>

        </PageContainer>

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
const PageContainer = styled.div`
    box-sizing: border-box;
    margin: 90px auto 0px;
    display:flex;
    justify-content: center;
`
