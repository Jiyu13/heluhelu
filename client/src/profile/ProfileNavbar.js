import styled from "styled-components"

export function ProfileNavbar( {page, setPage, setIsChanged} ) {

    let bgColor = "#f1f2f6"

    function handleSwitchPage(e) {
        e.preventDefault();
        const value = e.currentTarget.getAttribute("data-value")
        setPage(value)
        setIsChanged(false)
    }

    return (
        <NavbarContainer>
            <LinkItem 
                onClick={handleSwitchPage} 
                data-value="profile" 
                style={{backgroundColor: page === "profile" ? bgColor : ""}}
            >
                <Link href="/profile/#">Profile</Link>
            </LinkItem>
            <LinkItem 
                onClick={handleSwitchPage} 
                data-value="change_password" 
                style={{backgroundColor: page === "change_password" ? bgColor : ""}}
            >
                <Link href="/profile/#">Password</Link>
            </LinkItem>
            <LinkItem 
                onClick={handleSwitchPage} 
                data-value="delete_account" 
                style={{backgroundColor: page === "delete_account" ? "#ff6348" : ""}}
            >
                <Link href="/profile/#">Delete Account</Link>
            </LinkItem>
        </NavbarContainer>
    )
}

const Link = styled.a`
    text-decoration: none;
    padding: 6px 16px;
    color: #3e3e3e;
`

const LinkItem = styled.li`
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 20px;
    line-height: 1.5em;
    font-size: 1rem;
    color: #3e3e3e;
    &:hover {
        background-color: #f1f2f6;
        color: black;
    }
`
const NavbarContainer = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr;
    grid-gap: 12px;
    list-style: none;
    padding: 4px; 6px;
    border-radius: 4px;
    background: #d2dae2;
`
