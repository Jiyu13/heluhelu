import {useEffect, useState} from "react";

import Reader from "./Reader";
import Documents from "./Documents"
import { Route, Routes } from "react-router-dom";


function App() {

  const [dictionary, setDictionary]= useState([])
  const [articles, setArticles] = useState([])


  useEffect(() => {
    fetch('/articles')
        .then(res => res.json())
        .then(articles => setArticles(articles))
  }, [])

  // console.log(articles)

  useEffect(() => {
    fetch('/dictionary')
        .then(res => res.json())
        .then(dictionary => setDictionary(dictionary))
  }, [])

  // console.log(dictionary)

  function handleNewText(newText) {
    setArticles([...articles, newText])
  }

  return (
    <main>
        <Routes >
            <Route
                path='/'
                element={
                    <Reader onAddNewText={handleNewText}/>
                }
            >
            </Route>

            <Route
                path='/documents'
                element={<Documents articles={articles}/>}
            >
            </Route>
      </Routes>

    </main>
  );
}

export default App;
