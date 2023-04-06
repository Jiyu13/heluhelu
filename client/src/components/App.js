import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import { AccountBox } from "../account/AccountBox";
import { UserContext } from "./UserContext";

import Home from "./Home";
import NavBar from "../navbar/NavBar";
import { Article } from "../articles/Article";
import { ArticleList } from "../articles/ArticleList";
import { DictionaryUpload } from "../dictionary/DIctionaryUpload";


function App() {

  const [dictionary, setDictionary]= useState([])
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState("") // set to empty string
  
  const [user, setUser] = useState(null);


  // =========== get articles =================================
  useEffect(() => {
    fetch('/articles')
        .then(res => res.json())
        .then(articles => setArticles(articles))
  }, [])

  // =========== get dictioanry ================================
  useEffect(() => {
    fetch('/dictionaries')
        .then(res => res.json())
        .then(dictionary => setDictionary(dictionary))
  }, [])

  // =========== check session - user remains logged in ========
  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  

  function handleNewText(newArticle) {
    setArticles([...articles, newArticle])
  }

  // ======== user context value ===================
  const userContextValue = {user, setUser, article, setArticle}
  // console.log(user)

  return (
    <UserContext.Provider value={userContextValue}>
      {!user ? 
        <AccountBox/> 
        :
        <main>
            <NavBar/>
            <Routes >
              <Route
                exact
                path='//upload_dictionary'
                element={<DictionaryUpload/>}
              >
              </Route>
              <Route
                exact
                path='/articles/:id'
                element={<Article key={article?.id}/>}
              >
              </Route>
              <Route
                exact
                path='/articles'
                element={<ArticleList articles={articles}/>}
              >
              </Route>

              <Route
                exact
                path='/login'
                element={<AccountBox/>}
              >
              </Route>

              <Route
                exact
                path='/'
                element={<Home onAddNewText={handleNewText}/>}
              >
              </Route>
          </Routes>

        </main>
      }
    </UserContext.Provider>
  );
}

export default App;
