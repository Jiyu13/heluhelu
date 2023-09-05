import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';


import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { Accessibility } from "./Accessiblity";
import { MobileNavLinks } from "./MobileNavLinks";
import { DeviceSize } from '../responsive';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';


function NavBar() {

    // useMediaQuery from react responsive
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const {user, isDark} = useContext(UserContext)
    
    return (
        <>
            {user ? 
                <NavBarContainer className={isDark === true ? "dark" : "light"}>
                    {/* call the Logo component */}
                    <LeftSection>
                        <Logo />
                    </LeftSection>

                    {/* call NavLinks component */}
                    <MiddleSection>
                        {/* hide NavLinks if isMoble isn't mobile */}
                        {!isMobile && <NavLinks/>}
                    </MiddleSection>

                    {/* call Accessibility component */}
                    <RightSection>
                        {/* hide Accessiblity if isMoble isn't mobile */}
                        {!isMobile && <Accessibility/>}
                        
                        {/* show MobileNavLinks if isMoble is mobile */}
                        {isMobile && <MobileNavLinks/>}
                    </RightSection>
                </NavBarContainer>
                : ""
            }
        </>
    )

}

export default NavBar;

const NavBarContainer = styled.div`
    width: 100%;
    height: 60px;
    box-shadow: 0 1px 3px rgba(15, 15, 0.13);
    display: flex;
    align-items: center;
    padding: 0 1.5em;
    // prevent padding from making 100% width extend beyond screen
    box-sizing: border-box;
    position: fixed;
    z-index: 1;   // make navbar on top of articleList when scrolling down
    top: 0;
`;

const LeftSection = styled.div`
    display: flex;
`;

const MiddleSection = styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    justify-content: center;
`;

const RightSection = styled.div`
    display: flex;
`;