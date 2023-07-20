// import styled from "styled-components"


// import book_material_icon from "../assets/images/book_material_icon.svg"
// import add_icon from "../assets/images/add_icon.svg"


// import { TranslationWord } from "../TranslationWord";
// import { CustomWord } from "../CustomWord"


// export function Disctionary() {

//     return (
//         <DictionaryArea>
//             <span style={{"font-size":"12px"}}>Total words: {articleWords?.length}</span>
//             <br/>
//             <PagesContainer>
//                 <BookIcon><img src={book_material_icon} alt="book icon"/></BookIcon>
//                 <PageDisplay>pg: {currentPage + 1} of {pages}</PageDisplay>
//             </PagesContainer>

//             <SearchArea 
//                 type="text"
//                 value={targetWord}
//                 onChange={handleSearchChange} 
//             />

//             {customWord ? "" :
//                 <AddImage 
//                     src={add_icon} 
//                     alt="add translation for word button" 
//                     onClick={handleAddBtn} 
//                     id={targetWord}
//                 />
//             }

//             {customWord === null && targetWord !== null && chosen?.length === 0 && (
//                 <NotFound>
//                     No results found for '{targetWord}'.
//                 </NotFound>
//             )}
//             {showCustomForm && ( 
//                 <CustomForm onSubmit={handleCustomSubmit}>
//                     <Label>Hawaiian:
//                         <br/>
//                         <WordInput
//                             required
//                             disabled
//                             type="text"
//                             name="word"
//                             value={formData.word}
//                         />
//                     </Label>
//                     <br/>
//                     <Label>Translation:
//                         <br/>
//                         <TranslationInput
//                             required
//                             type="text"
//                             name="translation"
//                             value={formData.translation}
//                             onChange={handleCustomWord}
//                         />
//                         <br/>
//                     </Label>
//                     {wordExistError ? <ExistWarning>{wordExistError.message}</ExistWarning> : ""}
//                     <br/>
//                     <SaveButton type="submit" value="Save" style={{"background-color": "rgb(8, 61, 116)", "color": "white"}}/>
//                     <CancelButton type="button" value="Cancel" onClick={handleCancel}/>
//                 </CustomForm>
//             )}
//             <TranslationArea>
//                 {customWord && (<CustomWord key={customWord.id} word={customWord} setCustomWord={setCustomWord}/>)}
//                 {chosen?.map(word => <TranslationWord word={word.hawaiian} translation={word.translation }/>)}
                
//             </TranslationArea>
//         </DictionaryArea>
            
//     )
// }


// const ExistWarning = styled.span`
//     color: red;
//     font-size: 12px;
// `

// const CancelButton = styled.input`
//     width: 90%;
//     min-width: 90px !important;
//     max-width: 120px;  
//     width: 0.1em; 
//     height: 2em;
//     margin-right: 15px;
//     border: 0;
//     border-radius: 8px;
//     cursor: pointer;
//     font-size: 15px;
//     font-weight: 700;
// `

// const SaveButton = styled.input`
//     width: 90%;
//     min-width: 90px !important;
//     max-width: 120px;  
//     width: 0.1em; 
//     height: 2em;
//     margin-right: 15px;
//     border: 0;
// `

// const TranslationInput = styled.input`
//     width: 90%;
//     max-width: 235px;
// `

// const WordInput = styled.input`
//     width: 90%;
//     max-width: 235px;   
// `

// const Label = styled.label`
//     font-size: 15px;
//     font-weight: bold;
// `

// const CustomForm = styled.form`
//     border: 1px solid #eee;
//     margin-top: 35px;
//     padding: 10px;
//     text-align: center;
// `

// const NotFound = styled.div`
//     margin: 45px 0;
//     font-size: 25px;
// `

// const AddImage = styled.img`
//     width: 25px;
//     height: 25px;
//     margin-left: 6px;
//     cursor: pointer;
// `

// const ArticleContainer = styled.div`
//     display: flex;
//     flex-direction: row;
//     align-items: stretch;
//     gap: 1px;
//     margin: 0 auto;
//     box-sizing: border-box;
//     width: 100%;
//     min-height: 450px;
//     font-size: 20px;
//     line-height: 1.6;
//     height: calc(100% - 60px);  // Handle top bar which is 60px
//     position: fixed;
// `

// const SideBar = styled.div`
//     font-family: readex pro,arial,sans-serif;
//     word-spacing: 0;
//     box-sizing: border-box;
//     font-size: 19px;
//     flex-shrink: 1;
//     width: 10%;
//     cursor: pointer;
//     text-align: center!important;
//     flex-grow: 1;
//     line-height: 1.6;
// `

// const SideBarImage = styled.div`
//     width: 42px;
//     height: 42px;
//     margin: 100px auto 0 auto;
//     opacity: .5;
// `

// const ReadableArea = styled.div`
//     max-width: 725px;
//     background-color: #333;
//     color: #ddd;
//     background-color: #333;
//     color: #ddd;
//     overflow: auto;
// `

// const ReadableContent = styled.div`
//     font-size: 20px;
//     line-height: 1.6;
//     padding: 8px;
// `

// const DictionaryArea = styled.div`
//     background-color: #282828;
//     color: #bbb;
//     max-width: 300px;
//     flex-basis: 25%;
//     box-sizing: border-box;
//     padding: 0 12px 12px 12px;
//     line-height: 1.6;

//     overflow: auto;
// `

// const SearchArea = styled.input`
//     width: 90%;
//     border-radius: 8px;
//     height: 20px;
//     font-size: 25px;
//     max-width: 150px;
// ` 

// const TranslationArea = styled.div``

// const PagesContainer = styled.div`
//     font-size: 20px;
//     line-weight: 1.6;
//     display: block;
// `

// const PageDisplay = styled.div`
//     font-size: 12px;
//     font-weight: 700;
//     line-weight: 1;
//     display: inline-block;
//     vertical-align: top;
//     padding-top:8px;
//     padding-bottom: 10px;
//     margin-left: 8px;
// `

// const BookIcon = styled.div`
//     margin-top: 6px;
//     display: inline-block;
//     vertical-align: top;
//     width: 30xpx;
//     height: 25px;
// `