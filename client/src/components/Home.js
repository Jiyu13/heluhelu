import { useState } from "react";
import Reader from "./ArticleImporter";

function Home({onAddNewText}) {

    const [isShowReader, setShowReader] = useState(false)
    
    function handleClick() {
        setShowReader(!isShowReader)
    }
    return (
        <>
            <h1>Hawaiian Reader</h1>
            <p>Hawaiian learning tool. Read your Hawaiian text and articles in to Hawaiian Reader to make reading easier and to track your vocabulary growth over time.</p>
            

            <div className="upload-buttons">
                <button className="text" onClick={handleClick}>Enter Text</button>
                <button className="file">Import Text File</button>
            </div>
            
            {isShowReader ? <Reader onAddNewText={onAddNewText}/> : ""}
            

            
        </>
    ) 
}
export default Home;