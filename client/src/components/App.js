import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";


import Home from "./Home";
import Reader from "./Reader";
import ArticleList from "./ArticleList"
import NavBar from "../navbar/NavBar";

import { AccountBox } from "../account/AccountBox";
import { UserContext } from "./UserContext";



function App() {

  const [dictionary, setDictionary]= useState([])
  const [articles, setArticles] = useState([])
  const [isShowReader, setShowReader] = useState(false)
  // const [mode, setMode] = useState("dark")

  const [isDarkMode, setDarkMode] = useState("dark")
  const [user, setUser] = useState(null)


  // =========== get articles =================================
  useEffect(() => {
    fetch('/articles')
        .then(res => res.json())
        .then(articles => setArticles(articles))
  }, [])

  // =========== get dictioanry =================================
  useEffect(() => {
    fetch('/dictionaries')
        .then(res => res.json())
        .then(dictionary => setDictionary(dictionary))
  }, [])

  // =========== check session =================================
  useEffect(() => {
    fetch('/check_session')
    .then(res => {
      if (res.ok) {
        res.json().then((user) => setUser(user))
      }
    })
  }, [])


  function handleNewText(newArticle) {
    setArticles([...articles, newArticle])
  }


  // ======== user context value ===================
  const userContextValue = {user, setUser, isDarkMode, setDarkMode}


  return (
    <UserContext.Provider value={userContextValue} >

    <main className={isDarkMode}>
        <NavBar setDarkMode={setDarkMode}/>
        <Routes >
          <Route
            exact
            path='/login'
            element={<AccountBox/>}
          >
          </Route>

          {/* <Route
            exact
            path='/create_account'
            element={<CreateAccount/>}
          >
          </Route> */}

          <Route
            exact
            path='/documents'
            element={<ArticleList articles={articles}/>}
          >
          </Route>

          <Route
              exact
              path='/reader'
              element={<Reader onAddNewText={handleNewText} isShowReader={isShowReader}/>}
          >
          </Route>

          <Route
            exact
            path='/'
            element={<Home />}
          >
          </Route>

            
      </Routes>

    </main>
    
    </UserContext.Provider>
  );
}

export default App;
