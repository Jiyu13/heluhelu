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
import arrowUp from "../assets/images/black/arrow_up.svg"
import arrowDown from "../assets/images/black/arrow_down.svg"

import { PageNotFound } from "../components/PageNotFound"

export function Admin() {
    const {user} = useContext(UserContext)
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })

    const [users, setUsers] = useState(null)
    const [searchInput, setSearchInput] = useState("")
    const [isSortArticles, setIsSortArticles] = useState(false)

    useEffect(() => {
        apiFetch('/admin/users')
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

    function handleSortArticles() {
        setIsSortArticles(!isSortArticles)
    }


    const sortedUsers = isSortArticles && results ? 
                    [...results].sort((a,b) => b.article_counts - a.article_counts) 
                    :
                    results

    const gridTemplateColumns = isMobile ? "0.5fr 1.5fr 1fr 0.5fr": "0.5fr 1.5fr 4fr 0.5fr 0.5fr" 


    return (
        <PageContainer>
            {
                user?.id === 33 || user?.id === 1 ? 

                    <>
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

                            <TableHeaderContainer 
                                style={{
                                    gridTemplateColumns: gridTemplateColumns,
                                    alignItems: "center"
                                }}
                            >
                                <Column>ID</Column>
                                <Column>NAME</Column>
                                {!isMobile && (
                                    <Column>EMAIL</Column>
                                )}
                                
                                <Column style={{display: "flex", alignItems: "center"}}>
                                    <div>ARTICLES</div>
                                    <button 
                                        style={{border: "none", background: "none", width: "24px", padding: "0", cursor: "pointer"}}
                                        onClick={handleSortArticles}
                                    >
                                        <img src={arrowDown} alt="arrow down"/>
                                    </button>
                                    {/* <img src={arrowUp} alt="arrow up"/> */}
                                    
                                </Column>
                                <Column>ADMIN</Column>
                            </TableHeaderContainer>

                            {users && (
                                sortedUsers.map((user, index) => {
                                    return (
                                        <a 
                                            href={`/admin/user/${user.id}`} 
                                            style={{textDecoration: "none", color: "#000", fontSize: "1rem"}}
                                            key={user.id}
                                        >
                                            <TableDataContainer style={{gridTemplateColumns: gridTemplateColumns}}>
                                                <div>{user.id}</div>
                                                <div>{isMobile ? truncateString(user.username, 18) : user.username}</div>
                                                {!isMobile && (
                                                    <div>{user.email}</div>
                                                )}
                                                {/* <div>{isMobile ? truncateString(user.email, 18) : user.email}</div> */}
                                                <div>{user.article_counts}</div>
                                                <div>
                                                    <img 
                                                        src={user.id === 1 || user.id === 33 ? Tick : X}
                                                        alt="staff status"
                                                    />
                                                    
                                                </div>
                                            </TableDataContainer>
                                        </a>
                                
                                    )
                                })
                            )}
                        </ContainerBody>
                    </>
                :
                <PageNotFound />
            }
            
        </PageContainer>
          
    )
}

const Column = styled.div`
    font-weight: bold;
`

const TableHeaderContainer = styled(VocabHeader)`
    padding: 1rem 0.5rem 0.5rem;
`

const TableDataContainer = styled(VocabContainer)`
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