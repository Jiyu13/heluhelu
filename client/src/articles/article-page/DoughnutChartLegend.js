import styled from "styled-components"

export function DoughnutChartLegend(props) {
    const {
        payload,
        totalKnowns,knownUnique, totalIgnoreds, ignoredUnique, studyingUnique, newUnique
    } = props
    const newWordPayload = payload[0]
    const studyingPayload = payload[1]
    const knownPayload = payload[2]
    return (
        <>
            <NewWords>
                <LegendSpan style={{border: `2px solid ${newWordPayload.color}`}} />
                <DataDiv>
                    <DataSpan style={{fontWeight: "bold"}}>{`${newWordPayload.payload.value} (${newUnique})`}</DataSpan>
                    <DataSpan style={{fontSize:"0.7rem"}}>{`${newWordPayload.value}`}</DataSpan>
                </DataDiv>
            </NewWords>
            <Studying>
                <LegendSpan style={{border: `2px solid ${studyingPayload.color}`}} />
                <DataDiv>
                    <DataSpan style={{fontWeight: "bold"}}>{`${studyingPayload.payload.value} (${studyingUnique?.length})`}</DataSpan>
                    <DataSpan style={{fontSize:"0.7rem"}}>{`${studyingPayload.value}`}</DataSpan>
                </DataDiv>
            </Studying>
            <Known>
                <LegendSpan style={{border: `2px solid ${knownPayload.color}`}} />
                <DataDiv>
                    <DataSpan style={{fontSize:"0.75rem"}}>Known: <strong>{`${totalKnowns?.length} (${knownUnique?.length})`}</strong></DataSpan>
                    <DataSpan style={{fontSize:"0.75rem"}}>Ignored: <strong>{`${totalIgnoreds?.length} (${ignoredUnique?.length})`}</strong></DataSpan>
                </DataDiv>
            </Known>
        </>
    )   
}

const NewWords = styled.div`
    grid-area: new;
`
const Studying = styled.div`
    grid-area: studying;
    background-color:

`
const Known = styled.div`
    grid-area: known;
    background-color:
`
const LegendSpan = styled.span`
    margin-right: 4px;
    font-size: 25px;
`
const DataDiv = styled.div`
    display: inline-block;`

const DataSpan = styled.span`
    display: block;
`