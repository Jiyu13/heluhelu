import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import { AccountBox } from "../account/AccountBox";
import { UserContext } from "./UserContext";

import {Home} from "./Home";
import NavBar from "../navbar/NavBar";
import { Article } from "../articles/Article";
import { ArticleList } from "../articles/ArticleList";
import { DictionaryUpload } from "../dictionary/DIctionaryUpload";
import { ArticleEdit } from "../articles/ArticleEdit";
import { ArticleUUID } from "../articles/ArticleUUID";
import { SharePage } from "../articles/SharePage";
import { LoginForm } from "../account/LoginForm";
import { SignupForm } from "../account/SignupForm";
import { MyStats } from "../stats/MyStats";

const USER_NOT_SET = -1;

function App() {

  const [showCustomForm, setCustomForm] = useState(false)
  const [userArticles, setUserArticles] = useState([])
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState("")
  const [user, setUser] = useState(USER_NOT_SET);
  const [chosen, setChosen] = useState([])
  const [showAddBtn, setAddBtn] = useState(false)
  const [errors, setErrors] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(1)


  // ========= get articles =================================
  useEffect(() => {
    fetch('/articles')
        .then(res => res.json())
        .then(articles => setArticles(articles))
  }, [])

  
  // ========= check session - user remains logged in ========
  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        setUser(null)
      }
    });
  }, []);

  // ========= get user_articles ============================
  useEffect (() => {
    fetch('/user_articles')
    .then(res => res.json())
    .then(data => setUserArticles(data))
  }, [])

  // ========= update article ===============================
  function onUpdatedArticle(updatedArticle) {
    const updatedArticles = articles?.map(a => {
      if (a.id === updatedArticle.id) {
          return updatedArticle
      } else {
        return a
      }
    })
    setArticles(updatedArticles)
  }
  
  // ========= check word avaliability ========================
  function checkAvaliable(word) {
    if (word.length === 0) {
        setAddBtn(true)
    } else {
        setAddBtn(false)
        setCustomForm(false)
    }
  }

  // ========= delete current user article from dom ===========
  function onDeleteArticle(article_id) {

    const updatedArticles = articles.filter(a => {
      return a.id !== article_id
    })
    setArticles(updatedArticles)
  }

  
  // ========= calculate pages for an article ================
  function calculatePages(article) {
    return Math.ceil((article?.text?.replace(/(\r\n|\n|\r)/gm, "").split(" ").length)/250)
  }

  // ========= user context value ============================
  const userContextValue = {user, setUser, 
                            userArticles, setUserArticles,
                            article, setArticle, 
                            articles, setArticles,
                            chosen, setChosen, 
                            errors, setErrors,
                            isLoading, setLoading,
                            page, setPage,
                            calculatePages, checkAvaliable,
                            showAddBtn, setAddBtn,
                            showCustomForm, setCustomForm
                          }

  if(user === USER_NOT_SET) return;

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
                path='/stats'
                element={<MyStats/>}
              >
              </Route>
              <Route
                exact
                path='/article/share_receive/:uuid'
                element={<SharePage/>}
              >
              </Route>

              <Route
                exact
                path='/article/share/:id'
                element={<ArticleUUID/>}
              >
              </Route>

              <Route
                exact
                path='/article/edit/:id'
                element={<ArticleEdit onUpdatedArticle={onUpdatedArticle}/>}
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
                element={<ArticleList articles={articles} onDeleteArticle={onDeleteArticle}/>}
              >
              </Route>

              <Route
                exact
                path='/upload_dictionary'
                element={<DictionaryUpload/>}
              >
              </Route>

              {/* <Route
                exact
                path='/login'
                element={<AccountBox/>}
              >
              </Route> */}

              <Route
                exact
                path='/login'
                element={<LoginForm/>}
              >
              </Route>

              <Route
                exact
                path='/signup'
                element={<SignupForm/>}
              >
              </Route>

              <Route
                exact
                path='/'
                element={<Home/>}
              >
              </Route>
          </Routes>

        </main>
      }
    </UserContext.Provider>
  );
}

export default App;
