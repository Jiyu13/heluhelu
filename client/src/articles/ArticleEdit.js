import styled from "styled-components";

export function ArticleEdit() {
    return (
        <>
            <form>
                <div>Title:</div>
                <input/>
                <br/>

                <div>Content:</div>
                <textarea />
                <br/>

                <input type="submit">Submit</input>
            </form>
        </>
    )

}


const EditContainer = styled.div`
    text-align: center;
`