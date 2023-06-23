import styled from "styled-components"



const vocabStatusType = {
    Known: 2,
    Ignored: 3,
}


export function MarkNotFound( { word, PostAndDelete,checkStatus } ) {
    function handleChangeToKnown() {
        PostAndDelete(word, 2)
    }

    function handleIgnoredWord() {
        PostAndDelete(word, 3)
    }

    return (
            <TrackerContainer>
            
                <Mark 
                    onClick={handleChangeToKnown}
                >
                    {checkStatus(word) === 2 ? "Mark Not-Known" : "Mark Known"}
                </Mark>
                
                <Mark 
                    onClick={handleIgnoredWord}
                >
                    {checkStatus(word) === 3 ? "Undo Ignoring Word": "Ignore This Word"}
                </Mark>
            </TrackerContainer>
    )
}

const Mark = styled.span`
    width: 146px;
    font-size: 14px;
    
    color: inherit;
    margin-top: 3px;
    margin-right: 4px;
    padding: 8px 6px;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 5px;
    vertical-align: top;
    background-color: rgba(63, 158, 66, .2);
    cursor: pointer;
    display: grid;
    align-content: center;
    justify-content: center;

    &:hover {
        background-color: rgba(63, 158, 66,.6)!important;
    }
`

const TrackerContainer = styled.div`
    // padding: 12px;
    // margin-bottom: 6px;
    // font-size: 15px;
    // border: 1px solid #ccc;
    // border-radius: 6px;
    // background-color: rgba(255, 255, 255, 0.1);
    display: grid;
    row-gap: 8px;
    align-content: center;
    justify-content: center;
`
