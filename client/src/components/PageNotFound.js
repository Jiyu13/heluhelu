import { PageText, PageTitle } from "../styles/Container";

export function PageNotFound() {
    return (
        <>
            <PageTitle style={{fontSize: "48px"}}>Page Not Found</PageTitle>
            <PageText>The page you are looking for does not exist or some other error occurred.</PageText>
            

        </>
    )
}