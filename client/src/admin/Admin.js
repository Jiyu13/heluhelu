import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/UserContext"
import { ContainerBody, VocabHeader } from "../stats/VocabularyLists"
import styled from "styled-components"
import { PageContainer, PageTitle } from "../styles/Container"
import apiFetch from "../api/ApiFetch"
import { VocabContainer } from "../stats/Vocabulary"
import { useMediaQuery } from "react-responsive"
import { DeviceSize } from "../responsive"
import { truncateString } from "../utils/truncateString"

import X from "../assets/images/cancel_red.svg"
import Tick from "../assets/images/check_circle_green.svg"
import searchIcon from "../assets/images/black/search.svg"

export function Admin() {

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })

    const [users, setUsers] = useState(null)
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        apiFetch('/admin')
        .then(res => res.json())
        .then(data => {
            setUsers(data)
        })

    }, [])

    function handleOnChange(e) {
        setSearchInput(e.target.value)
    }

    const results = users && searchInput === ""? users : users?.filter((u => {
        const resultUsernames = u.username?.toLowerCase().includes(searchInput.toLowerCase())
        const resultEmails = u.email?.toLowerCase().includes(searchInput.toLowerCase())  
        return resultEmails + resultUsernames
    }))


    return (
        <PageContainer>
            <PageTitle>Admin Dashboard</PageTitle>
            <ContainerBody style={{paddingBottom: "0"}}>

                <SearchUserContainer>
                    <div style={{width: "2rem", display: "flex", gap: "1rem"}}>
                        <img src={searchIcon} alt='search icon' style={{width: "2rem"}}/>
                    </div>
                    
                    <SearchInput
                        type='text'
                        name='username'
                        onChange={handleOnChange}
                    />
                </SearchUserContainer>

                <AdminContainer>
                    <Column>ID</Column>
                    <Column>NAME</Column>
                    <Column>EMAIL</Column>
                    <Column>ADMIN</Column>
                </AdminContainer>

                {users && (
                    results.map((user, index) => {
                        return (
                    <AdmindDataContainer key={user.id}>
                        <div>{user.id}</div>
                        <div>{isMobile ? truncateString(user.username, 7) : user.username}</div>
                        <div>{isMobile ? truncateString(user.email, 18) : user.email}</div>
                        <div>
                            <img 
                                src={user.id === 1 || user.id === 33 ? Tick : X}
                                alt="staff status"
                            />
                            
                        </div>
                    </AdmindDataContainer>
                        )
                    })
                )}
                

            </ContainerBody>
        </PageContainer>
          
    )
}

const Column = styled.div`
    font-weight: bold;
`

const AdminContainer = styled(VocabHeader)`
    grid-template-columns: 0.5fr 1.5fr 4fr 0.5fr;
    padding: 1rem 0.5rem;
`

const AdmindDataContainer = styled(VocabContainer)`
    grid-template-columns: 0.5fr 1.5fr 4fr 0.5fr;
    padding: 1rem 0.5rem;
`

const SearchUserContainer = styled.div`
    padding: 1rem;
    background-image: linear-gradient(to left, rgb(253, 171, 115), rgb(174, 194, 143));
    max-width: 100%;
    display: flex;
    justify-content: end;
    gap: 1rem;
    box-sizing: border-box;
`
const SearchInput = styled.input`
    height: 36px;
    font-size: 1rem;
    margin-right: 12px;
    border: none;
    &:focus {
        border: none;
    }
`