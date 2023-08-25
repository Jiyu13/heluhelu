import styled from "styled-components";
import { ButtonElements } from "../components/Buttons";
import { useNavigate } from "react-router-dom";

export function ArticleErrorPage( {errorMessage} ) {
    let navigate = useNavigate()
    function handleClick() {
        navigate('/')
    }

    return (
        <ErrorContainer>
            <Main>
                <div>
                    <Status>404</Status>
                    <NotFound>ARTICLE NOT FOUND</NotFound>
                    <Message>Oops...{errorMessage}</Message>
                </div>
                <HomePageButton onClick={handleClick}>Go Back to Home</HomePageButton>
            </Main>
        </ErrorContainer>
    )
}
const ErrorContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2);
    margin: 60px auto 0;
    box-sizing: border-box;
    width: 100%;
    line-height: 1.6;
    height: calc(100% - 60px);  // Handle top bar which is 60px
    position: fixed;
    // center the whole main tag
    align-items: center;
    justify-content: center;
    text-align: center;
`

const Main = styled.main`
    height: 50%;
    padding: 1rem;
`

const Status = styled.div`
    font-size: 6rem;
    font-weight: bold;
    color: #353b48;
`
const NotFound = styled.div`
    font-weight: bold;
    font-size: 2rem;
    color: #353b48;
`
const Message = styled.div`
    margin: 1rem 0;
    color: #7f8fa6;
    font-size: 1rem;
`

const HomePageButton = styled(ButtonElements)`
    margin: 20px 0;
    font-size: 18px;
    // font-weight: Normal;
    height: 52px;
    padding: 0 32px;
`
