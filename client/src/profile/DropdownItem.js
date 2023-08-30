import styled from "styled-components";

export function DropdownItem(props) {
    const {icon, icon_info, text, handleMenuItemClick, goTo} = props
    return (
        <LinkItem>
            <Link href={goTo} onClick={handleMenuItemClick}>
                <img src={icon} alt={icon_info} style={{width: "16px", height: "16px"}}/>
                <span>{text}</span>
            </Link>
        </LinkItem>
    )
}

const LinkItem = styled.div`
    box-sizing: border-box;
    display: block;
    font-size: 0.775rem;
    line-height: 1.5;
    position: relative;
    margin: 0.8rem 0;
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
`;