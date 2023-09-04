import styled from "styled-components"
import { LineGraph } from "./LineGraph"

export function ReadingStats( {readEvents} ) {

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
            <hr style={{width: "30%", height: "5px", margin: "56px auto"}}/>
            <TableBox>                
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
                    <span style={{fontSize: "1rem"}}>* one page = 250 words of text</span>
                </TableContainer>
            </TableBox>
            <br/>
            
        </>
    )

}


const TodayReading = styled.div`
    text-align: center;
`

const GraphBox = styled.div`
    max-width: 600px;
    margin: 0px auto 0px auto
`

const TRow = styled.tr`
    color: #000;
`

const Table = styled.table`
    border-collapse: collapse;
    margin: 25px auto 0;
    font-size: .9em;
    font-family: sans-serif;
    min-width: 300px;
    width: 99%;
    box-sizing: border-box;
`


const TableContainer = styled.div`
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