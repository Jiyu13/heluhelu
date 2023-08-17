import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import styled from "styled-components"
import 'react-loading-skeleton/dist/skeleton.css'


export function SkeletonHomePage() {
    return (
        <SkeletonTheme baseColor="#dfe4ea" enableAnimation={false}>
    
            <ArticlesListContainer>
                <ArticlesListTable>
                <tbody>
                    {Array(5)
                        .fill()
                        .map((item, index) => (
                            <tr key={index}>
                                <ArticleTitleCell >
                                        <ArticleTitle>
                                            <Skeleton height={23} width={120}/>
                                            <br/>
                                            <Skeleton height={5} width={200}/>
                                        </ArticleTitle>
                                </ArticleTitleCell>
                                <EditCell>
                                    <EditContainer>
                                        <Button>
                                        <Skeleton height={40} width={40}/>
                                        </Button>
                                        <Button>
                                        <Skeleton height={40} width={40}/>
                                        </Button>
                                        <Button>
                                        <Skeleton height={40} width={40}/>
                                        </Button>
                                        <Button>
                                        <Skeleton height={40} width={40}/>
                                        </Button>
                                    </EditContainer>
                                </EditCell>
                            </tr>
                        ))
                    }
                </tbody>
                </ArticlesListTable>
            </ArticlesListContainer>
        </SkeletonTheme>
    )
}

const ArticlesListContainer = styled.div`
    margin: 45px auto 0;
    max-width: 750px;
    text-align: center;
    line-height: 1.6;
`

const ArticlesListTable = styled.table`
    width: 100%;
    max-width: 750px;
    display: table;
    box-sizing: border-box;
    text-align: center;
`

const ArticleTitleCell = styled.td`
    border: 3px solid rgb(227, 231, 239);
    border-radius: 1.25rem;
`

const ArticleTitle = styled.div`
    padding: 12px 18px;
    border-radius: 8px;
    text-align: left;
    vertical-align: top;
`
const EditCell = styled.td`
    vertical-align: top;
    width: 100px;
    border-radius: 8px;
`

const EditContainer = styled.div`
    margin-top: 4px;
    text-align: right;
    width: 100px;
    font-size: 20px;
    line-height: 1.6;
`
const Button = styled.a`
    display: inline-block;
    position: relative;
    top: -2px;
    vertical-align: top;
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 3px;
    text-align: center;
    margin-bottom: 4px;
    margin-right: 4px;
`