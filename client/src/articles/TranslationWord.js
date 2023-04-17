import { useState } from "react"
import styled from "styled-components"


export function TranslationWord( {word} ) {

    const [isReadMore, setReadMore] = useState(false)


    // const toggleReadMore = () => {
    //     setReadMore(!isReadMore)
    // }
    

    return (
        <WordItem key={word.id}>
            <Word>{word.hawaiian} :</Word>
            {/* <Translation>{word.translation}</Translation> */}
            <Translation>
                {word.translation.length > 50 ? word.translation.substring(0, 50) : word.translation}

                {isReadMore ?  word.translation : word.translation.substring(0, 50)}

                {word.translation.length > 50 ? 
                
                    <ReadOrHidebutton onClick={() => setReadMore(!isReadMore)}>
                        {isReadMore ? " Show Less" : "Show More"}
                    </ReadOrHidebutton> 
                    : null
                }
                

                
            </Translation>
            <hr/>
        </WordItem>
    )
}

const ReadOrHidebutton = styled.button`
    // color: rgb(192,192,192);
    cursor: pointer;
`

const WordItem = styled.div``

const Word = styled.div`
    font-weight: bold;
    color: rgb(255, 255, 255);
`

const Translation = styled.div`
    display: inline;
  width: 100%;
`
