import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import { AccountBox } from "../account/AccountBox";
import { UserContext } from "./UserContext";

import {Home} from "./Home";
import NavBar from "../navbar/NavBar";

import { Article } from "../articles/article-page/Article";
import { ArticleEdit } from "../articles/article-list-page/ArticleEdit";

import { ArticleUUID } from "../articles/share/ArticleUUID";
import { SharePage } from "../articles/share/SharePage";

import { MyStats } from "../stats/MyStats";
import apiFetch from "../api/ApiFetch";
import {FileImporter} from "../articles/import/FileImporter";
import ArticleImporter from "../articles/import/ArticleImporter";
import { VocabularyStats } from "../stats/VocabularyStats";
import { ShowArticleUniqueWords } from "../articles/article-unique-words-page/ShowArticleUniqueWords";
import { ProfilePage } from "../profile/ProfilePage";
import { ResetPassword } from "../forget-password/ResetPassword";
import { LoginPage } from "../account/LoginPage";
import { SignupPage } from "../account/SignupPage";
import styled from "styled-components";
import { ForgetPassword } from "../forget-password/ForgetPassword";
import { ResetRedirect } from "../forget-password/ResetRedirect";

const USER_NOT_SET = -1;

export default function App() {
  const storedDarkMode = localStorage.getItem("DARK_MODE")

  const [articles, setArticles] = useState(null)
  const [article, setArticle] = useState(null)
  const [user, setUser] = useState(USER_NOT_SET);
  const [isDark, setIsDark] = useState(storedDarkMode === "true")
  const [lastClick, setLastClick] = useState(null)

  // ========= check session - user remains logged in ========
  useEffect(() => {
    apiFetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        setUser(null)
      }
    })
    .catch((error) => {
      console.error("Error checking session:", error);
      setUser(null);
    });
  }, []);

  // =========== fetch the first article in articles list =========
  const [firstArticle, setFirstArticle] = useState(null)
  useEffect(() => {
      apiFetch(`/articles/first`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setFirstArticle(data))
        }
      })
      .catch(error => console.error("Error fetching vocabularies:", error));
      
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
  

  // ========= delete current user article from dom ===========
  function onDeleteArticle(article_id) {

    const updatedArticles = articles.filter(a => {
      return a.id !== parseInt(article_id)
    })
    setArticles(updatedArticles)
  }

  // ========= calculate pages for an article ================
  function splitText(article) {
    const articleWords = article?.text?.split(" ")                                  // get all words
        .map(word => word.replaceAll("\n\n", "\n"))
        .flatMap(word => word.replaceAll("\n", "##\n").split("\n"))                 // replace "\n\n" to "##\n\n" then split by \n\n
    return articleWords
  }


  function calculatePages(articleWords) {
      const words_length = articleWords?.length
      const pages = Math.ceil(words_length / 250)
      return pages
  }
  
  // ====== vocabularies =====================================
  const [vocabularies, setVocabularies] = useState(null)
  useEffect(() => {
      apiFetch('/vocabularies')
      .then(res => res.json())
      .then(data => {
        setVocabularies(data)
      })
      .catch(error => console.error("Error fetching vocabularies:", error));
  }, [])


  // ============ mode ===================
  useEffect(() => {
    localStorage.setItem("DARK_MODE", isDark)
  }, [isDark])

  
  function handleSetLastClick() {
    setLastClick(new Date().getTime())
  }

  console.log(user)

  // ========= user context value ============================
  const userContextValue = {user, setUser, 
                            article, setArticle, setArticles,
                            splitText, calculatePages,
                            vocabularies, setVocabularies,
                            firstArticle,
                            isDark, setIsDark,
                            lastClick, setLastClick, handleSetLastClick
                          }

  if(user === USER_NOT_SET) return;

  return (
    <UserContext.Provider value={userContextValue}>
        <div className={user && isDark === true ? "dark" : "light"}>
          {user && (
            <header>
              <NavBar/>
            </header>
          )}
          <main style={{minHeight: "100vh"}}>
            <Routes >
                <Route
                  exact
                  path="/stats/vocabularies"
                  element={<VocabularyStats/>}
                >
                </Route>
                <Route
                  exact
                  path='/stats'
                  element={<MyStats/>}
                >
                </Route>

                <Route
                  exact
                  path='/article/word_stats/:id/:article_title'
                  element={<ShowArticleUniqueWords/>}
                >
                </Route>

                <Route
                  exact
                  path='/article/share_receive/:uuid'
                  element={
                    <SharePage
                      articles={articles}
                      setArticles={setArticles}
                    />
                  }
                >
                </Route>

                <Route
                  exact
                  path='/article/share/:id/:article_title/:uuid'
                  element={<ArticleUUID/>}
                >
                </Route>

                <Route
                  exact
                  path='/article/edit/:id/:article_title'
                  element={<ArticleEdit onUpdatedArticle={onUpdatedArticle}/>}
                >
                </Route>
                
                <Route
                  exact
                  path='/articles/:id/:article_title'
                  element={<Article/>}
                >
                </Route>

                <Route
                  exact
                  path='/import/text'
                  element={
                    <ArticleImporter
                      articles={articles}
                      setArticles={setArticles}
                    />
                  }
                >
                </Route>
                <Route
                  exact
                  path='/import/file'
                  element={
                    <FileImporter
                      articles={articles}
                      setArticles={setArticles}
                    />
                  }
                >
                </Route>


                <Route
                  exact
                  path='/reset/click'
                  element={<ResetRedirect/>}
                >
                </Route>
                <Route
                  exact
                  path='/reset_password'
                  element={<ResetPassword/>}
                >
                </Route>
                <Route
                  exact
                  path='/account/recover'
                  element={<ForgetPassword/>}
                >
                </Route>

                <Route
                  exact
                  path='/login'
                  element={<LoginPage/>}
                >
                </Route>

                <Route
                  exact
                  path='/signup'
                  element={<SignupPage/>}
                >
                </Route>
                <Route
                  exact
                  path='/profile'
                  element={<ProfilePage/>}
                >
                </Route>

                <Route
                  exact
                  path='/'
                  element={
                    <Home 
                      user={user}
                      articles={articles}
                      setArticles={setArticles}
                      onDeleteArticle={onDeleteArticle}
                    />
                  }
                >
                </Route>
            </Routes>
          </main>
        </div>
    </UserContext.Provider>
  );
}

export const AppContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;

    background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top,  rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg,  #670d10 0%, #092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756',GradientType=1 );
`;

export const EmptyDiv = styled.div`
    width: 100%; 
    height: 100%;
    position: fixed;
    z-index: 10
`