import styled from "styled-components";

export function DropdownItem(props) {
    const {icon, icon_info, text, handleClick, goTo} = props
    return (
        <LinkItem>
            <Link href={goTo} onClick={handleClick}>
                <img src={icon} alt={icon_info} style={{width: "16px", height: "16px"}}/>
                <span>{text}</span>
            </Link>
        </LinkItem>
    )
}

const LinkItem = styled.div`
    box-sizing: border-box;
    display: block;
    font-size: 1rem;
    line-height: 1.5;
    position: relative;
    margin: 0.8rem 0;
    border-radius: 20px;
    
    color: #3e3e3e;

    &:hover {
        background-color: #f1f2f6;
        color: black;
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    padding: 3px;

`;
