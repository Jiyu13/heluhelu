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

const ReadableArea = styled.div`
    display: block;
    max-width: 725px;
    width: 100%;
    overflow: auto;
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

const InfoPopup = styled.div`
    float: right;
`

const ArticleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 1px;
    margin: 60px auto 0;
    box-sizing: border-box;
    width: 100%;
    min-height: 450px;
    line-height: 1.6;
    height: calc(100% - 60px);  // Handle top bar which is 60px
    position: fixed;
`

const SideBar = styled.div`
    word-spacing: 0;
    box-sizing: border-box;
    flex-shrink: 1;
    width: 10%;
    cursor: pointer;
    text-align: center!important;
    flex-grow: 1;
    line-height: 1.6;
`

const DictionaryArea = styled.div`
    max-width: 300px;
    min-width: 250px;
    flex-basis: 25%;
    box-sizing: border-box;
    padding: 0 12px 12px;
    line-height: 1.6;
    overflow: auto;
`