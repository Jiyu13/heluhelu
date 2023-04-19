import styled from "styled-components"
import { LineGraph } from "./LineGraph"

export function StatsTable( {readEvents, setReadEvets} ) {
    // console.log(readEvents)

    return (
        <>  
            <TodayReading>
                Pages Read Today: {(readEvents?.today / 250).toFixed(2) }
            </TodayReading>
            <br/>
            <br/>
            <GraphBox>
                <LineGraph/>
            </GraphBox>
            <br/>
            <br/>
            <TableBox>
                <h2>Reading Stats</h2>
                <TableContainer>
                    <Table className="styled-table">
                        <thead>
                            <TRow>
                                <th>Time Period</th>
                                <th>Pages</th>
                                <th>Avg Daily Pgs</th>
                            </TRow>
                        </thead>

                        <tbody>
                            <TRow>
                                <td>Today:</td>
                                <td colSpan="2">{readEvents?.today / 250 } pgs</td>
                            </TRow>
                            <TRow>
                                <td>Yesterday:</td>
                                <td colSpan="2">{readEvents?.yesterday / 250} pgs</td>
                            </TRow>
                            <TRow>
                                <td>This Week:</td>
                                <td>{readEvents?.week.total / 250} pgs</td>
                                <td>{(readEvents?.week.avg / 250).toFixed(2)} pgs/day</td>
                            </TRow>
                            <TRow>
                                <td>This Month:</td>
                                <td>{readEvents?.month.total / 250} pgs</td>
                                <td>{(readEvents?.month.avg / 250).toFixed(2)} pgs/day</td>
                            </TRow>
                            <TRow>
                                <td>This Year:</td>
                                <td>{readEvents?.year.total / 250} pgs</td>
                                <td>{(readEvents?.year.avg / 250).toFixed(2)} pgs/day</td>
                            </TRow>
                            <TRow>
                                <td>All Time:</td>
                                <td>{readEvents?.total / 250} pgs</td>
                                <td> -- </td>
                            </TRow>
                        </tbody>
                    </Table>
                </TableContainer>
            </TableBox>
            <br/>
            <span>* one page = 250 words of text</span>
        </>
    )

}


const TodayReading = styled.div`
    text-align: center;
`

const GraphBox = styled.div`
    max-width: 600px;
    margin: 0 auto 0px auto
`

const TRow = styled.tr``

const Table = styled.table`
    border-collapse: collapse;
    margin: 25px auto 0;
    font-size: .9em;
    font-family: sans-serif;
    min-width: 300px;
    width: 99%;
    box-sizing: border-box;
    box-shadow: 0 0 20px white;
`


const TableContainer = styled.div`
    // overflow-x: scroll;
    width: 99%;
    box-sizing: border-box;
    max-width: 600px;
    min-width: 300px;
    font-size: 20px;
    line-height: 1.6;
`

const TableBox = styled.div`
    text-align: center;
    display: block;
    margin: 0 auto;
    max-width: 600px;
    
`