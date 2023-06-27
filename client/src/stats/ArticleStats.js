import { Link } from "react-router-dom";

import more_icon from "../assets/images/more_horiz_white_48dp.svg"
import styled from "styled-components";

export function ArticleStats() {
    return (
        <MoreIconContainer>

            {/* <MoreIconImage className="more-icon-svg"></MoreIconImage> */}
            
            <Link to="/">
                <MoreIconImage src={more_icon} alt="more"/>
            </Link>


        </MoreIconContainer>
    )
}

const MoreIconContainer = styled.div`
    width: 100%;
    height: 15px;
`

const MoreIconImage = styled.img`
    float: right;
    opacity: 0.8;
    margin-right: 5px;

    &:hover {
        opacity: 1;
    }
`