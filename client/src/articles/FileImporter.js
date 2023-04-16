import styled from "styled-components"

export function FileImport() {
    return (
        <FileBox>
            <b>Accepted file types: .txt.</b>
            <br/>
            <br/>
            <FormContainer >
            {/* onSubmit={handleSubmit} */}
                <ImportFileInput
                    required
                    type="file"
                    accept='.txt'
                    name='filename'
                    // onChange='{handleOnChange}'
                />
                <br/>
                <TitleText>
                    Give this document a title:
                </TitleText>
                <FileTitle 
                    required
                    type="text"
                    placeholder="Enter title here..."
                    name="title"
                    // onChange="{handleOnChange}"
                />
                <br/>
                <SubmitButton type="submit" value="Import" />
                <br/>
                
            </FormContainer>
        </FileBox>
    )
}

const FileBox = styled.div`
    background-color: rgb(204, 204, 204);
    padding: 18px;
    text-align: center;
    display: block;
`

const FormContainer = styled.form`
    margin: 0;
    padding: 0;
    display: block;
`

const ImportFileInput = styled.input`
    padding: 12px;
    margin-bottom: 12px;
    width: 90%;
    max-width: 700px;
    font-size: 18px;
    border: 2px solid #eee;
    border-radius: 8px;
`

const TitleText = styled.div`
    margin-top: 12px;
    font-size: 15px;
    font-weight: Bold;
`

const FileTitle = styled.input`
    width: 90%;
    max-width: 800px;
    background-color: #ddd;
    border: 2px solid #999;
    padding: 8px;
    margin-bottom: 8px;
    font-size: 17px;
    border-radius: 8px;
    outline: none;
    line-weight: 1.6;
`

const SubmitButton = styled.input`
    margin-top: 12px;
`