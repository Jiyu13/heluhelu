import styled from "styled-components"

export function WordTracker( {word, PostAndDelete, checkStatus} ) {
    const vocabStatusType = {
        Unknown: 0, 
        Studying: 1,
        Known: 2,
        Ignored: 3,
    }


    let trackWord 
    if (word && (word?.length) !== 0) {
        trackWord = word[0]["hawaiian_clean"]
    }
    

    function handleChangeToKnown() {
        PostAndDelete(trackWord, 2)
    }

    function handleIgnoredWord() {
        PostAndDelete(trackWord, 3)
    }


    const vocabStatus = Object.keys(vocabStatusType).find(key => vocabStatusType[key] === checkStatus(trackWord))

    let styling
    switch(vocabStatus) {
        case "Studying":
            styling = "rgba(255, 221, 89, 0.5)"
            break;
        case "Known":
            styling = ""
            break;
        case "Ignored":
            styling = ""
            break;
        default:
            styling = "rgba(112, 161, 255, 0.5)"
    }
    
    return (
        <WordTrackerBox>
            <TrackerContainer>
                Word Status: 
                <ShowStatus style={{backgroundColor: styling}}>{vocabStatus}</ShowStatus>
                <br/>
                <Mark onClick={handleChangeToKnown}>{checkStatus(trackWord) === 2 ? "Mark Not-Known" : "Mark Known"}</Mark>
                <Mark onClick={handleIgnoredWord}>{checkStatus(trackWord) === 3 ? "Undo Ignoring Word": "Ignore This Word"}</Mark>
            </TrackerContainer>
        </WordTrackerBox>
    )
}



const Mark = styled.span`
    width: 146px;
    font-size: 14px;
    display: inline-block;
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

    &:hover {
        background-color: rgba(63, 158, 66,.6)!important;
    }
`

const ShowStatus = styled.span`
    display: inline-block;
    border: 2px solid transparent;
    cursor: pointer;
    font-size: inherit;
    line-height: 1.6;
    padding: 2px 6px;
    &:hover {
        background-color: rgba(112, 161, 255, .8)!important;
    }
`

const TrackerContainer = styled.div`
    padding: 12px 4px 2px 4px;
    margin-bottom: 6px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.1);
`

const WordTrackerBox = styled.div``


