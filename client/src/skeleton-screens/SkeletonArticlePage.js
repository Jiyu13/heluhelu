import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

export function SkeletonArticlePage() {
    
    return (
        <SkeletonTheme baseColor="rgba( 40, 40, 40, 0.8)" enableAnimation={false}>
                <HeaderContainer>
                    <PagesContainer>
                        <Skeleton 
                            height={24} 
                            width={130}
                            style={{
                                marginTop: "6px",
                            }}
                        />
                    </PagesContainer>
                    <Skeleton 
                        height={30} 
                        width={30} 
                        style={{
                            float: "right",
                            marginRight: "10px",
                            marginTop: "6px"
                        }}
                    />
                </HeaderContainer> 

                <ReadableContent>
                        {Array(150)
                            .fill()
                            .map((item, index) => 
                                <WordContainer key={index}>
                                    <Skeleton height={28} width={Math.random()*100 + 6}/>
                                </WordContainer>
                            )
                        }
                </ReadableContent>
            </SkeletonTheme> 

            
    )
}

const WordContainer = styled.div`
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 8px;
    padding: 0px 4px;
    display: inline-block;
    vertical-align: top;
`

const ReadableContent = styled.div`
    line-height: 1.6;
    padding: 0 8px 8px;
` 

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 6px;
    margin-bottom: 12px;
`

const PagesContainer = styled.div`
    margin-left: 8px;
    display: flex;
`