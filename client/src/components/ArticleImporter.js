import React, {useState} from 'react';


function Reader( {onAddNewText } ) {

    // const {user} = useContext(UserContext)

    const initialValues = {
        text: "",
        title: ""
    }

    const [formData, setFormData] = useState(initialValues)

    function handleOnChange(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newArticle = {
            text: formData.text,
            title: formData.title
        }

        fetch('/articles',{
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newArticle)
        })
            .then((res) => res.json())
            .then(newObj => {
                onAddNewText(newObj);
                setFormData(initialValues)
            })

    }



    return (
        <>
            <div className='new-article-form'>
                <h1>Enter your text: </h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Paste your Hawaiian test here..."
                        name='text'
                        value={formData.text}
                        onChange={handleOnChange}

                    />

                    <label>Give this text a title:</label>
                    <input 
                        type="text"
                        placeholder="Enter title here..."
                        name="title"
                        value={formData.title}
                        onChange={handleOnChange}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
}

export default Reader;