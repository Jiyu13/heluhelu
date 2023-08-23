import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

export function SkeletonVocabStatsList() {

    return (
        <SkeletonTheme enableAnimation={false}>
            {Array(10)
                .fill()
                .map((item, index) => {
                    return (
                        <VocabContainer key={index}>
                            <Skeleton height={Math.random()*80 + 6} />
                        </VocabContainer>
                    )
                })
            }
        </SkeletonTheme>
    )
}

const VocabContainer = styled.div`
    box-sizing: border-box;
    width: 95%;
    border: 1px solid #bdc3c7;
    border-radius: 8px;
    padding: 1.5rem 0.5rem 1rem;
    margin: 0.5rem auto;
`