import React, {useEffect, useState} from 'react';


function Reader( {onAddNewText} ) {
    const [text, setText] = useState("")
    function handleSubmit(e) {
        e.preventDefault();
        fetch('/articles',{
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({
                text: text
            })
        })
            .then((res) => res.json())
            .then(newText => {
                onAddNewText(newText);
                setText("")
            })

    }



    return (
        <div className='content-container'>
            <h1>Enter your text: </h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    name='content'
                    value={text}
                    onChange={(e) => setText(e.target.value)}

                />
                <input type="submit" value="Submit" />
            </form>

        </div>

    );
}

export default Reader;